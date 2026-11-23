/* Party Mix Training - app logic (no build step, plain JavaScript) */
(function () {
  "use strict";
  var C = window.PM_CONTENT, CFG = window.PM_CONFIG || {};
  var app = document.getElementById("app");
  var DEMO = !CFG.API_URL;

  /* ---------- helpers ---------- */
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function strip(h) { return String(h).replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim(); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function nowIso() { return new Date().toISOString(); }
  function keyOf(name) { return String(name).trim().toLowerCase().replace(/\s+/g, " "); }
  function modById(id) { for (var i = 0; i < C.modules.length; i++) if (C.modules[i].id === id) return C.modules[i]; return null; }
  function lsGet(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function fmtDate(iso) { if (!iso) return "-"; var d = new Date(iso); return isNaN(d) ? "-" : d.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" }); }
  function fmtDateTime(iso) { if (!iso) return "-"; var d = new Date(iso); return isNaN(d) ? "-" : d.toLocaleString("en-AU", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" }); }

  /* ---------- state ---------- */
  var session = lsGet("pm_session");       // {name, pin}
  var progress = null;
  var quizState = null;
  var practiceState = {};
  var syncTimer = null, pendingAttempts = [], syncStatus = "saved";

  function blankProgress() { return { v: 1, read: {}, quiz: {}, skills: {}, practice: {}, started: nowIso(), updated: nowIso(), completedAt: null }; }

  /* ---------- progress maths ---------- */
  function modFrac(m) {
    var read = (progress.read[m.id] || []).length, total = m.lessons.length;
    var q = progress.quiz[m.id];
    return 0.5 * Math.min(1, read / total) + (q && q.passed ? 0.5 : 0);
  }
  function modDone(m) { var q = progress.quiz[m.id]; return (progress.read[m.id] || []).length >= m.lessons.length && !!(q && q.passed); }
  function summary() {
    var n = C.modules.length, done = 0, sum = 0, qs = [], alone = 0, skillsTotal = 0;
    C.modules.forEach(function (m) {
      sum += modFrac(m); if (modDone(m)) done++;
      var q = progress.quiz[m.id]; if (q && q.total) qs.push(q.best / q.total);
      skillsTotal += m.skills.length;
      var s = progress.skills[m.id] || {};
      Object.keys(s).forEach(function (k) { if (s[k] && s[k][2]) alone++; });
    });
    return {
      percent: Math.round(100 * sum / n), modulesDone: done, modulesTotal: n,
      avgQuiz: qs.length ? Math.round(100 * qs.reduce(function (a, b) { return a + b; }, 0) / qs.length) : 0,
      skillsAlone: alone, skillsTotal: skillsTotal
    };
  }

  /* ---------- API (Google Apps Script, or demo mode in the browser) ---------- */
  function demoApi(action, p) {
    var users = lsGet("pm_demo_users") || {}, k = keyOf(p.name || "");
    function done(o) { lsSet("pm_demo_users", users); return Promise.resolve(o); }
    if (action === "register") {
      if (users[k]) return Promise.resolve({ ok: false, error: "That name is already registered. Log in instead, or use your full name." });
      users[k] = { name: p.name.trim(), pin: p.pin, progress: null, summary: null, updated: nowIso() };
      return done({ ok: true, name: users[k].name, progress: null });
    }
    if (action === "login") {
      if (!users[k] || users[k].pin !== p.pin) return Promise.resolve({ ok: false, error: "Name or PIN not right. Check your spelling or ask your manager to reset your PIN." });
      return Promise.resolve({ ok: true, name: users[k].name, progress: users[k].progress });
    }
    if (action === "save") {
      if (!users[k] || users[k].pin !== p.pin) return Promise.resolve({ ok: false, error: "auth" });
      users[k].progress = p.progress; users[k].summary = p.summary; users[k].updated = nowIso();
      return done({ ok: true });
    }
    if (action === "dashboard") {
      if (p.managerPin !== "demo") return Promise.resolve({ ok: false, error: "Wrong manager PIN (demo mode PIN is: demo)" });
      return Promise.resolve({ ok: true, users: Object.keys(users).map(function (x) { var u = users[x]; return { name: u.name, summary: u.summary || {}, progress: u.progress, updated: u.updated }; }) });
    }
    if (action === "resetPin") {
      if (p.managerPin !== "demo") return Promise.resolve({ ok: false, error: "Wrong manager PIN" });
      var uk = keyOf(p.name); if (!users[uk]) return Promise.resolve({ ok: false, error: "User not found" });
      users[uk].pin = p.newPin; return done({ ok: true });
    }
    return Promise.resolve({ ok: false, error: "Unknown action" });
  }
  function api(action, payload) {
    if (DEMO) return demoApi(action, payload);
    var body = JSON.stringify(Object.assign({ action: action }, payload));
    return fetch(CFG.API_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: body, redirect: "follow" })
      .then(function (r) { return r.json(); });
  }

  /* ---------- saving ---------- */
  function setSync(s) {
    syncStatus = s;
    var el = document.getElementById("syncChip");
    if (el) el.textContent = s === "saved" ? "Saved ✓" : s === "saving" ? "Saving…" : "Offline: will retry";
  }
  function persist(attempt) {
    if (!session) return;
    progress.updated = nowIso();
    var s = summary();
    if (s.modulesDone === s.modulesTotal && !progress.completedAt) progress.completedAt = nowIso();
    lsSet("pm_progress_" + keyOf(session.name), progress);
    if (attempt) pendingAttempts.push(attempt);
    setSync("saving");
    clearTimeout(syncTimer);
    syncTimer = setTimeout(flush, 700);
  }
  function flush() {
    if (!session) return;
    var attempts = pendingAttempts.slice();
    api("save", { name: session.name, pin: session.pin, progress: progress, summary: summary(), attempts: attempts })
      .then(function (r) {
        if (r && r.ok) { pendingAttempts = pendingAttempts.slice(attempts.length); setSync("saved"); }
        else { setSync("offline"); syncTimer = setTimeout(flush, 8000); }
      })
      .catch(function () { setSync("offline"); syncTimer = setTimeout(flush, 8000); });
  }
  window.addEventListener("online", function () { if (session) flush(); });

  /* ---------- top bar ---------- */
  function renderTop() {
    var t = document.getElementById("topbarRight");
    var b = document.getElementById("modeBanner");
    var logo = document.getElementById("logo");
    if (CFG.LOGO) logo.src = CFG.LOGO;
    if (DEMO) { b.hidden = false; b.textContent = "Demo mode: progress is saved on this device only. Set API_URL in config.js to save to your Google Sheet."; } else b.hidden = true;
    if (session) t.innerHTML = '<span class="chip">👋 ' + esc(session.name) + '</span><span class="chip" id="syncChip">Saved ✓</span><button class="btn-link" data-act="logout">Log out</button>';
    else t.innerHTML = "";
  }

  /* ---------- views ---------- */
  function renderLogin(msg) {
    app.innerHTML =
      '<div class="card login"><h1>Welcome to the team! 🎉</h1>' +
      '<p>Log in with your <strong>full name</strong> and a <strong>4-digit PIN</strong>. Your progress saves automatically, so you can stop and pick up again on any phone or computer.</p>' +
      '<div class="field"><label for="ln">Full name (first and last)</label><input id="ln" type="text" autocomplete="name" placeholder="e.g. Sarah Nguyen"></div>' +
      '<div class="field"><label for="lp">4-digit PIN</label><input id="lp" type="password" inputmode="numeric" maxlength="4" autocomplete="off" placeholder="••••"></div>' +
      '<div class="err" id="lerr">' + esc(msg || "") + '</div>' +
      '<div class="row"><button class="btn" data-act="login">Log in</button><button class="btn alt" data-act="register">I\'m new: create my account</button></div>' +
      '<p class="muted" style="margin-top:14px">Forgot your PIN? Ask your manager to reset it.</p></div>';
  }
  function doAuth(kind) {
    var name = document.getElementById("ln").value.trim(), pin = document.getElementById("lp").value.trim();
    var err = document.getElementById("lerr");
    if (name.length < 3 || name.indexOf(" ") < 0) { err.textContent = "Please enter your first and last name."; return; }
    if (!/^\d{4}$/.test(pin)) { err.textContent = "Your PIN must be exactly 4 digits."; return; }
    err.textContent = "One moment…";
    api(kind, { name: name, pin: pin }).then(function (r) {
      if (!r || !r.ok) { err.textContent = (r && r.error) || "Something went wrong. Try again."; return; }
      session = { name: r.name || name, pin: pin };
      lsSet("pm_session", session);
      progress = r.progress || lsGet("pm_progress_" + keyOf(session.name)) || blankProgress();
      ["read", "quiz", "skills", "practice"].forEach(function (k) { if (!progress[k]) progress[k] = {}; });
      lsSet("pm_progress_" + keyOf(session.name), progress);
      renderTop(); location.hash = "#/"; route();
    }).catch(function () { err.textContent = "Can't reach the server. Check your internet and try again."; });
  }
  function logout() { session = null; progress = null; localStorage.removeItem("pm_session"); renderTop(); renderLogin(); location.hash = "#/"; }

  function statusOf(m) {
    if (modDone(m)) return '<span class="status done">✓ Complete</span>';
    if ((progress.read[m.id] || []).length || progress.quiz[m.id]) return '<span class="status prog">In progress</span>';
    return '<span class="status">Not started</span>';
  }
  var searchIndex = null;
  function buildIndex() {
    searchIndex = [];
    C.modules.forEach(function (m) { m.lessons.forEach(function (l, i) { searchIndex.push({ m: m, i: i, title: l.title, text: strip(l.body) }); }); });
  }
  function renderHome() {
    var s = summary(), next = null;
    for (var i = 0; i < C.modules.length; i++) if (!modDone(C.modules[i])) { next = C.modules[i]; break; }
    var h = '<div class="card hero"><h1>Hi ' + esc(session.name.split(" ")[0]) + '! 👋</h1>' +
      '<p>' + (next ? 'Pick up where you left off, or choose any module below.' : 'You\'ve completed every module. Amazing work!') + '</p>' +
      '<div class="progress"><span style="width:' + s.percent + '%"></span></div>' +
      '<div class="stats"><div class="stat"><b>' + s.percent + '%</b>complete</div><div class="stat"><b>' + s.modulesDone + '/' + s.modulesTotal + '</b>modules done</div>' +
      '<div class="stat"><b>' + s.avgQuiz + '%</b>avg quiz score</div><div class="stat"><b>' + s.skillsAlone + '/' + s.skillsTotal + '</b>skills solo</div></div>' +
      '<div class="row noprint" style="margin-top:14px">' +
      (next ? '<a class="btn" style="background:#fff;color:#14509e;text-decoration:none" href="#/m/' + next.id + '">Continue: ' + esc(next.title) + '</a>' : '<a class="btn" style="background:#fff;color:#14509e;text-decoration:none" href="#/cert">🎓 View my certificate</a>') + '</div></div>' +
      '<input class="search" id="searchBox" type="search" placeholder="🔍 Search the training (e.g. refund, Hi-Float, bond)…" autocomplete="off">' +
      '<div id="searchOut"></div><div id="modGrid" class="grid">';
    C.modules.forEach(function (m) {
      var pct = Math.round(100 * modFrac(m));
      h += '<a class="mod" href="#/m/' + m.id + '"><div class="ico">' + m.icon + '</div><h3>' + esc(m.title) + '</h3><p>' + esc(m.blurb) + '</p>' + statusOf(m) +
        '<div class="progress dark" style="margin-top:10px"><span style="width:' + pct + '%"></span></div></a>';
    });
    h += "</div>";
    app.innerHTML = h;
  }
  function doSearch(q) {
    var out = document.getElementById("searchOut"), grid = document.getElementById("modGrid");
    q = q.trim().toLowerCase();
    if (q.length < 2) { out.innerHTML = ""; grid.style.display = ""; return; }
    if (!searchIndex) buildIndex();
    var hits = searchIndex.filter(function (x) { return (x.title + " " + x.text).toLowerCase().indexOf(q) >= 0; }).slice(0, 12);
    grid.style.display = "none";
    if (!hits.length) { out.innerHTML = '<div class="card">Nothing found for "' + esc(q) + '". Try a different word.</div>'; return; }
    out.innerHTML = hits.map(function (x) {
      var t = x.text, at = t.toLowerCase().indexOf(q), snip = t.substr(Math.max(0, at - 50), 140);
      return '<a class="card" style="display:block;text-decoration:none;color:inherit" href="#/m/' + x.m.id + '/learn/' + x.i + '"><strong>' + x.m.icon + " " + esc(x.m.title) + " › " + esc(x.title) + '</strong><div class="muted">…' + esc(snip) + "…</div></a>";
    }).join("");
  }

  function renderModule(id, tab, openLesson) {
    var m = modById(id);
    if (!m) { location.hash = "#/"; return; }
    tab = tab || "learn";
    var tabs = [["learn", "📖 Learn"], ["skills", "✅ Skills"]];
    if (m.practice) tabs.push(["practice", "📝 Practice"]);
    tabs.push(["quiz", "🧠 Quiz"]);
    var h = '<div class="crumbs"><a href="#/">← All modules</a></div><h1>' + m.icon + " " + esc(m.title) + "</h1>" + statusOf(m) +
      '<div class="tabs">' + tabs.map(function (t) { return '<button class="tab' + (t[0] === tab ? " on" : "") + '" data-act="tab" data-id="' + m.id + '" data-tab="' + t[0] + '">' + t[1] + "</button>"; }).join("") + "</div>";
    if (tab === "learn") h += viewLearn(m, openLesson);
    else if (tab === "skills") h += viewSkills(m);
    else if (tab === "practice") h += viewPractice(m);
    else h += viewQuiz(m);
    app.innerHTML = h;
    window.scrollTo(0, 0);
  }

  function viewLearn(m, openLesson) {
    var read = progress.read[m.id] || [], h = "";
    if (m.videos) {
      h += '<h3>🎬 Videos</h3><div class="videos">' + m.videos.map(function (v) {
        if (/\.mp4$/i.test(v.url || "")) return '<div class="vid" style="display:block"><div style="margin-bottom:6px">▶ ' + esc(v.title) + '</div><video controls preload="metadata" playsinline style="width:100%;max-width:340px;border-radius:10px;background:#000" src="' + esc(v.url) + '"></video></div>';
        return '<div class="vid"><span>▶ ' + esc(v.title) + '</span>' + (v.url ? '<a class="btn sm" target="_blank" rel="noopener" href="' + esc(v.url) + '">Watch</a>' : '<span class="pill">Ask your trainer</span>') + "</div>";
      }).join("") + "</div>";
    }
    h += "<h3>📖 Lessons</h3>";
    m.lessons.forEach(function (l, i) {
      var isRead = read.indexOf(i) >= 0;
      h += '<details class="lesson' + (isRead ? " read" : "") + '"' + (openLesson === i ? " open" : "") + '><summary><span>' + esc(l.title) + '</span>' + (isRead ? '<span class="tick">✓ Read</span>' : "") + '</summary><div class="body">' + l.body +
        '<div class="row" style="margin-top:14px"><button class="btn sm' + (isRead ? " alt" : "") + '" data-act="read" data-id="' + m.id + '" data-i="' + i + '">' + (isRead ? "Mark as unread" : "✓ Got it: mark as read") + "</button></div></div></details>";
    });
    if (read.length >= m.lessons.length) h += '<div class="card"><strong>All lessons read! 🎉</strong> <button class="btn sm" data-act="tab" data-id="' + m.id + '" data-tab="quiz">Take the quiz →</button></div>';
    return h;
  }

  function viewSkills(m) {
    var sk = progress.skills[m.id] || {};
    var h = '<div class="card"><p>Tick each box as you level up. Your trainer will watch you and check in: <strong>Watch me</strong> (you see it done), <strong>Do it with me</strong> (together), <strong>Do it alone</strong> (you\'ve got it).</p>' +
      '<table class="skills"><tr><th>Skill</th><th>Watch me</th><th>Do it with me</th><th>Do it alone</th></tr>';
    m.skills.forEach(function (s, i) {
      var r = sk[i] || [false, false, false];
      h += "<tr><td>" + esc(s) + "</td>" + [0, 1, 2].map(function (j) { return '<td><input type="checkbox" data-act="skill" data-id="' + m.id + '" data-i="' + i + '" data-j="' + j + '"' + (r[j] ? " checked" : "") + ' aria-label="' + esc(s) + '"></td>'; }).join("") + "</tr>";
    });
    return h + "</table></div>";
  }

  /* ---- quiz ---- */
  function viewQuiz(m) {
    var q = progress.quiz[m.id], pass = Math.ceil(C.passMark * m.quiz.length);
    if (quizState && quizState.id === m.id) return renderQuizQ(m);
    var h = '<div class="card"><h3>Quiz: ' + esc(m.title) + "</h3><p>" + m.quiz.length + " questions. Pass mark: <strong>" + pass + " out of " + m.quiz.length + "</strong>. You'll see the right answer and why after each question. You can retry as many times as you like.</p>";
    if (q) h += '<p>Best score: <strong>' + q.best + "/" + q.total + "</strong> · Attempts: " + q.attempts + (q.passed ? ' · <span class="pass">Passed ✓</span>' : "") + "</p>";
    h += '<button class="btn" data-act="startquiz" data-id="' + m.id + '">' + (q ? "Try again" : "Start quiz") + "</button></div>";
    return h;
  }
  function startQuiz(id) {
    var m = modById(id);
    quizState = { id: id, qs: shuffle(m.quiz.map(function (x, i) { var idx = shuffle(x.o.map(function (_, k) { return k; })); return { i: i, q: x.q, opts: idx.map(function (k) { return x.o[k]; }), a: idx.indexOf(x.a), w: x.w }; })), n: 0, score: 0, picked: null, wrong: [] };
    renderModule(id, "quiz");
  }
  function renderQuizQ(m) {
    var s = quizState, total = s.qs.length;
    if (s.n >= total) return renderQuizResult(m);
    var q = s.qs[s.n], h = '<div class="card"><div class="muted">Question ' + (s.n + 1) + " of " + total + '</div><div class="progress dark" style="margin:8px 0 14px"><span style="width:' + Math.round(100 * s.n / total) + '%"></span></div><h3 style="margin-top:0">' + esc(q.q) + "</h3>";
    q.opts.forEach(function (o, i) {
      var cls = "opt", dis = "";
      if (s.picked != null) { dis = " disabled"; if (i === q.a) cls += " right"; else if (i === s.picked) cls += " wrong"; }
      h += '<button class="' + cls + '"' + dis + ' data-act="answer" data-i="' + i + '">' + esc(o) + "</button>";
    });
    if (s.picked != null) {
      var ok = s.picked === q.a;
      h += '<div class="why"><strong>' + (ok ? "✅ Correct!" : "❌ Not quite. The right answer: " + esc(q.opts[q.a])) + "</strong><br>" + esc(q.w) + '</div><button class="btn" data-act="nextq">' + (s.n + 1 >= total ? "See my score" : "Next question →") + "</button>";
    }
    return h + "</div>";
  }
  function answer(i) {
    var s = quizState; if (!s || s.picked != null) return;
    s.picked = i; var q = s.qs[s.n];
    if (i === q.a) s.score++; else s.wrong.push(q);
    renderModule(s.id, "quiz");
  }
  function nextQ() { quizState.n++; quizState.picked = null; var m = modById(quizState.id); if (quizState.n >= quizState.qs.length) finishQuiz(m); renderModule(quizState.id, "quiz"); }
  function finishQuiz(m) {
    var s = quizState; if (s.saved) return; s.saved = true;
    var pass = s.score >= Math.ceil(C.passMark * s.qs.length);
    var q = progress.quiz[m.id] || { best: 0, total: s.qs.length, attempts: 0, passed: false };
    q.attempts++; q.total = s.qs.length; q.best = Math.max(q.best, s.score); q.passed = q.passed || pass; q.last = s.score; q.at = nowIso();
    progress.quiz[m.id] = q;
    persist({ module: m.id, title: m.title, score: s.score, total: s.qs.length, passed: pass, at: nowIso() });
  }
  function renderQuizResult(m) {
    var s = quizState, total = s.qs.length, need = Math.ceil(C.passMark * total), pass = s.score >= need;
    var h = '<div class="card" style="text-align:center"><div class="score ' + (pass ? "pass" : "fail") + '">' + s.score + " / " + total + "</div><h2>" + (pass ? "🎉 You passed!" : "Almost there! You need " + need + " to pass.") + "</h2>";
    if (s.wrong.length) { h += '<div style="text-align:left"><h4>Review the ones you missed</h4>' + s.wrong.map(function (q) { return '<div class="why"><strong>' + esc(q.q) + "</strong><br>✅ " + esc(q.opts[q.a]) + "<br>" + esc(q.w) + "</div>"; }).join("") + "</div>"; }
    h += '<div class="row" style="justify-content:center;margin-top:10px"><button class="btn alt" data-act="startquiz" data-id="' + m.id + '">Try again</button><button class="btn" data-act="tab" data-id="' + m.id + '" data-tab="learn" data-endquiz="1">Back to lessons</button>' + nextModBtn(m, pass) + "</div></div>";
    return h;
  }
  function nextModBtn(m, pass) {
    if (!pass) return "";
    var idx = C.modules.indexOf(m), n = C.modules[idx + 1];
    return n ? '<a class="btn" style="text-decoration:none" href="#/m/' + n.id + '">Next module →</a>' : '<a class="btn" style="text-decoration:none" href="#/">Home</a>';
  }

  /* ---- order form practice ---- */
  function viewPractice(m) {
    var si = practiceState.i || 0, sc = m.practice[si];
    var pdone = progress.practice[m.id] || {};
    var h = '<div class="card"><h3>Order form practice</h3><p>Read the customer brief, then fill in the order the way you would in the shop. Then press <strong>Check my order</strong>.</p>' +
      '<div class="row">' + m.practice.map(function (_, i) { return '<button class="tab' + (i === si ? " on" : "") + '" data-act="pscen" data-i="' + i + '">Scenario ' + (i + 1) + (pdone[i] ? " ✓" : "") + "</button>"; }).join("") + "</div>" +
      '<div class="tip"><strong>📞 Customer brief:</strong> ' + esc(sc.brief) + "</div>" +
      '<div class="field"><label>Customer name</label><input type="text" id="pf_name"></div>' +
      '<div class="field"><label>Phone number</label><input type="tel" id="pf_phone"></div>' +
      '<div class="field"><label>Items ordered</label><input type="text" id="pf_items" placeholder="What are they ordering?"></div>' +
      '<div class="row"><div class="field" style="flex:1;min-width:120px"><label>Pickup date</label><input type="text" id="pf_date" placeholder="e.g. 14 Nov"></div>' +
      '<div class="field" style="flex:1;min-width:120px"><label>Day of week</label><input type="text" id="pf_day" placeholder="e.g. Friday"></div>' +
      '<div class="field" style="flex:1;min-width:120px"><label>Pickup time</label><input type="text" id="pf_time" placeholder="e.g. 2:30 pm"></div></div>' +
      '<div class="field"><label>Payment: what do you do?</label><select id="pf_pay"><option value="">Choose…</option><option value="full">Take full payment before we inflate</option><option value="pickup">Customer pays on pickup</option><option value="instore">Customer is in store: payment at the till</option></select></div>' +
      '<div class="field"><label>How many receipts do you print?</label><select id="pf_rec"><option value="">Choose…</option><option value="1">1</option><option value="2">2</option><option value="3">3</option></select></div>' +
      '<div class="field"><label><input type="checkbox" id="pf_wb"> I offered a balloon weight and bag</label></div>' +
      '<div class="field"><label><input type="checkbox" id="pf_note"> I typed the pickup date, day and time into the POS order note</label></div>' +
      '<div class="row"><button class="btn" data-act="pcheck" data-id="' + m.id + '">Check my order</button></div>';
    return h + '<div id="pfResult"></div></div>';
  }
  function checkPractice(id) {
    var m = modById(id), si = practiceState.i || 0, sc = m.practice[si];
    function v(x) { return (document.getElementById(x).value || "").trim(); }
    var checks = [
      ["Customer name", sc.name.test(v("pf_name")), "Should include the customer's name"],
      ["Phone number", v("pf_phone").replace(/\D/g, "") === sc.phone, "Phone: " + sc.phone],
      ["Items ordered", v("pf_items").length > 2, "List what they're ordering"],
      ["Pickup date", sc.date.test(v("pf_date")), "Date: " + sc.dateShow],
      ["Day of week", sc.day.test(v("pf_day")), "Day: " + sc.dayShow],
      ["Pickup time", sc.time.test(v("pf_time")), "Time: " + sc.timeShow],
      ["Payment", v("pf_pay") === sc.payment, sc.payment === "full" ? "This customer is paying now: take FULL payment before we inflate" : sc.payment === "pickup" ? "This customer pays on pickup: choose pay on pickup" : "This customer is in store: payment at the till"],
      ["Receipts", v("pf_rec") === "2", "Print 2: one for the customer, one attached to the order form"],
      ["Weight and bag offered", document.getElementById("pf_wb").checked, "Always offer a balloon weight and bag"],
      ["POS order note", document.getElementById("pf_note").checked, "Always add date, day and time to the POS note"]
    ];
    var good = checks.filter(function (c) { return c[1]; }).length, all = good === checks.length;
    var h = '<div class="why" style="margin-top:14px"><strong>' + (all ? "🎉 Perfect order! All 10 steps right." : good + " of 10 right. Fix the ones marked ✗ and check again.") + "</strong>" +
      checks.map(function (c) { return '<div class="fb ' + (c[1] ? "ok" : "no") + '">' + (c[1] ? "✓ " : "✗ ") + esc(c[0]) + (c[1] ? "" : ": " + esc(c[2])) + "</div>"; }).join("") + "</div>";
    var box = document.getElementById("pfResult");
    if (box) box.innerHTML = h;
    if (all) { var p = progress.practice[m.id] || {}; p[si] = true; progress.practice[m.id] = p; persist(); }
  }

  /* ---- certificate ---- */
  function renderCert() {
    var s = summary();
    if (s.modulesDone < s.modulesTotal) { app.innerHTML = '<div class="card">Finish all modules to unlock your certificate. You\'re ' + s.percent + '% there! <a href="#/">Back to modules</a></div>'; return; }
    app.innerHTML = '<div class="cert"><div style="font-size:3rem">🎈</div><h1>Certificate of Completion</h1><p>Party Mix Training proudly presents this certificate to</p><div class="nm">' + esc(session.name) + '</div><p>for completing all ' + s.modulesTotal + ' training modules with an average quiz score of <strong>' + s.avgQuiz + '%</strong>.</p><p>' + fmtDate(progress.completedAt) + '</p></div><div class="row noprint" style="margin-top:14px"><button class="btn" data-act="print">🖨️ Print / save as PDF</button><a class="btn alt" style="text-decoration:none" href="#/">Back home</a></div>';
  }

  /* ---- manager dashboard ---- */
  var mgrPin = null;
  function renderManagerLogin(msg) {
    app.innerHTML = '<div class="card login"><h1>Manager dashboard</h1><p>See every hire\'s progress.</p><div class="field"><label>Manager PIN</label><input type="password" id="mp" autocomplete="off"></div><div class="err">' + esc(msg || "") + '</div><div class="row"><button class="btn" data-act="mgrlogin">Open dashboard</button><a class="btn alt" style="text-decoration:none" href="#/">Back</a></div>' + (DEMO ? '<p class="muted">Demo mode PIN: demo</p>' : "") + "</div>";
  }
  function loadManager() {
    app.innerHTML = '<div class="card">Loading…</div>';
    api("dashboard", { managerPin: mgrPin }).then(function (r) {
      if (!r || !r.ok) { mgrPin = null; renderManagerLogin((r && r.error) || "Couldn't load"); return; }
      var us = r.users || [];
      us.sort(function (a, b) { return String(b.updated).localeCompare(String(a.updated)); });
      var h = '<div class="crumbs"><a href="#/">← Back</a></div><h1>👥 Team progress</h1><p class="muted">' + us.length + " hire(s). Tap a name for detail.</p>" +
        '<div class="card"><table><tr><th>Name</th><th>Progress</th><th>Modules</th><th>Avg quiz</th><th>Skills solo</th><th>Last active</th></tr>';
      us.forEach(function (u, i) {
        var s = u.summary || {};
        h += '<tr data-act="mgrdetail" data-i="' + i + '" style="cursor:pointer"><td><strong>' + esc(u.name) + "</strong></td><td>" + (s.percent || 0) + "%</td><td>" + (s.modulesDone || 0) + "/" + (s.modulesTotal || C.modules.length) + "</td><td>" + (s.avgQuiz || 0) + "%</td><td>" + (s.skillsAlone || 0) + "/" + (s.skillsTotal || "-") + "</td><td>" + fmtDateTime(u.updated) + "</td></tr>";
      });
      h += '</table></div><div id="mgrDetail"></div>';
      app.innerHTML = h; window._pmUsers = us;
    }).catch(function () { renderManagerLogin("Can't reach the server"); });
  }
  function showDetail(i) {
    var u = window._pmUsers[i], p = u.progress || {}, el = document.getElementById("mgrDetail");
    var h = '<div class="card"><h2>' + esc(u.name) + '</h2><table><tr><th>Module</th><th>Lessons read</th><th>Quiz best</th><th>Attempts</th><th>Skills solo</th></tr>';
    C.modules.forEach(function (m) {
      var read = ((p.read || {})[m.id] || []).length, q = (p.quiz || {})[m.id], sk = (p.skills || {})[m.id] || {}, alone = 0;
      Object.keys(sk).forEach(function (k) { if (sk[k] && sk[k][2]) alone++; });
      h += "<tr><td>" + m.icon + " " + esc(m.title) + "</td><td>" + read + "/" + m.lessons.length + "</td><td>" + (q ? q.best + "/" + q.total + (q.passed ? " ✓" : "") : "-") + "</td><td>" + (q ? q.attempts : 0) + "</td><td>" + alone + "/" + m.skills.length + "</td></tr>";
    });
    h += '</table><div class="row"><button class="btn alt sm" data-act="mgrreset" data-i="' + i + '">Reset this person\'s PIN</button></div></div>';
    el.innerHTML = h; el.scrollIntoView({ behavior: "smooth" });
  }

  /* ---------- router ---------- */
  function route() {
    renderTop();
    var parts = (location.hash || "#/").replace(/^#\/?/, "").split("/");
    if (parts[0] === "manager") { if (mgrPin) loadManager(); else renderManagerLogin(); return; }
    if (!session) { renderLogin(); return; }
    if (!progress) {
      progress = lsGet("pm_progress_" + keyOf(session.name)) || blankProgress();
      ["read", "quiz", "skills", "practice"].forEach(function (k) { if (!progress[k]) progress[k] = {}; });
    }
    if (parts[0] === "m" && parts[1]) {
      if (quizState && quizState.id !== parts[1]) quizState = null;
      if (parts[2] !== "practice") practiceState = {};
      renderModule(parts[1], parts[2], parts[3] != null ? parseInt(parts[3], 10) : undefined);
    }
    else if (parts[0] === "cert") renderCert();
    else renderHome();
    setSync(syncStatus);
  }
  window.addEventListener("hashchange", route);

  /* ---------- events ---------- */
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-act]"); if (!t) return;
    var act = t.getAttribute("data-act"), id = t.getAttribute("data-id");
    if (t.tagName === "INPUT") return;
    switch (act) {
      case "login": doAuth("login"); break;
      case "register": doAuth("register"); break;
      case "logout": logout(); break;
      case "tab": if (t.getAttribute("data-endquiz")) quizState = null; if (!t.getAttribute("data-endquiz") && t.getAttribute("data-tab") !== "quiz") quizState = null; location.hash = "#/m/" + id + "/" + t.getAttribute("data-tab"); break;
      case "read":
        var i = parseInt(t.getAttribute("data-i"), 10), arr = progress.read[id] || [], at = arr.indexOf(i);
        if (at >= 0) arr.splice(at, 1); else arr.push(i);
        progress.read[id] = arr; persist(); renderModule(id, "learn", i); break;
      case "startquiz": startQuiz(id); break;
      case "answer": answer(parseInt(t.getAttribute("data-i"), 10)); break;
      case "nextq": nextQ(); break;
      case "pscen": practiceState = { i: parseInt(t.getAttribute("data-i"), 10) }; renderModule(location.hash.split("/")[2], "practice"); break;
      case "pcheck": checkPractice(id); break;
      case "print": window.print(); break;
      case "mgrlogin": mgrPin = document.getElementById("mp").value.trim(); loadManager(); break;
      case "mgrdetail": showDetail(parseInt(t.getAttribute("data-i"), 10)); break;
      case "mgrreset":
        var u = window._pmUsers[parseInt(t.getAttribute("data-i"), 10)], np = prompt("New 4-digit PIN for " + u.name + ":");
        if (np && /^\d{4}$/.test(np)) api("resetPin", { managerPin: mgrPin, name: u.name, newPin: np }).then(function (r) { alert(r && r.ok ? "PIN reset. Tell " + u.name + " their new PIN." : ((r && r.error) || "Failed")); });
        else if (np) alert("PIN must be exactly 4 digits.");
        break;
    }
  });
  document.addEventListener("change", function (e) {
    var t = e.target;
    if (t.getAttribute && t.getAttribute("data-act") === "skill") {
      var id = t.getAttribute("data-id"), i = t.getAttribute("data-i"), j = parseInt(t.getAttribute("data-j"), 10);
      var sk = progress.skills[id] || {}, r = sk[i] || [false, false, false];
      r[j] = t.checked; sk[i] = r; progress.skills[id] = sk; persist();
    }
  });
  document.addEventListener("input", function (e) { if (e.target.id === "searchBox") doSearch(e.target.value); });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Enter") return;
    if (e.target.id === "ln" || e.target.id === "lp") doAuth("login");
    if (e.target.id === "mp") { mgrPin = e.target.value.trim(); loadManager(); }
  });

  route();
})();
