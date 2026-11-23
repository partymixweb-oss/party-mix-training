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

  function blankProgress() { return { v: 1, read: {}, quiz: {}, skills: {}, practice: {}, viewed: {}, started: nowIso(), updated: nowIso(), completedAt: null }; }

  /* ---------- progress maths ---------- */
  function modFracP(m, p) {
    var read = ((p.read || {})[m.id] || []).length, total = m.lessons.length || 1, q = (p.quiz || {})[m.id];
    return 0.5 * Math.min(1, read / total) + (q && q.passed ? 0.5 : 0);
  }
  function modDoneP(m, p) { var q = (p.quiz || {})[m.id]; return ((p.read || {})[m.id] || []).length >= m.lessons.length && !!(q && q.passed); }
  function modFrac(m) { return modFracP(m, progress); }
  function modDone(m) { return modDoneP(m, progress); }
  function todayStr() { var d = new Date(); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
  function fmtDue(due) { var p = String(due).split("-"), d = new Date(+p[0], +p[1] - 1, +p[2]); return isNaN(d) ? due : d.toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "short" }); }
  var assignments = [], asgLoaded = false;
  function assignedMods(asg) {
    if (!asg || !asg.length) return null;
    var ids = {}; asg.forEach(function (a) { ids[a.id] = 1; });
    var out = C.modules.filter(function (m) { return ids[m.id]; });
    return out.length ? out : null;
  }
  function activeMods(asg) { return assignedMods(asg) || C.modules; }
  function statsFor(p, asg) {
    p = p || {};
    var mods = activeMods(asg), n = mods.length || 1, done = 0, sum = 0, qs = [], alone = 0, st = 0, overdue = 0, today = todayStr(), dueMap = {};
    (asg || []).forEach(function (a) { dueMap[a.id] = a.due; });
    mods.forEach(function (m) {
      sum += modFracP(m, p);
      if (modDoneP(m, p)) done++; else if (dueMap[m.id] && dueMap[m.id] < today) overdue++;
      var q = (p.quiz || {})[m.id]; if (q && q.total) qs.push(q.best / q.total);
      st += m.skills.length;
      var s = (p.skills || {})[m.id] || {};
      Object.keys(s).forEach(function (k) { if (s[k] && s[k][2]) alone++; });
    });
    return {
      percent: Math.round(100 * sum / n), modulesDone: done, modulesTotal: mods.length, overdue: overdue,
      avgQuiz: qs.length ? Math.round(100 * qs.reduce(function (x, y) { return x + y; }, 0) / qs.length) : 0,
      skillsAlone: alone, skillsTotal: st
    };
  }
  function summary() { return statsFor(progress, assignments); }

  /* ---------- API (Google Apps Script, or demo mode in the browser) ---------- */
  function demoApi(action, p) {
    var users = lsGet("pm_demo_users") || {}, k = keyOf(p.name || "");
    function done(o) { lsSet("pm_demo_users", users); return Promise.resolve(o); }
    if (action === "register") {
      if (users[k]) return Promise.resolve({ ok: false, error: "That name is already registered. Log in instead, or use your full name." });
      users[k] = { name: p.name.trim(), pin: p.pin, progress: null, summary: null, updated: nowIso() };
      return done({ ok: true, name: users[k].name, progress: null, assignments: [] });
    }
    if (action === "login") {
      if (!users[k] || users[k].pin !== p.pin) return Promise.resolve({ ok: false, error: "Name or PIN not right. Check your spelling or ask your manager to reset your PIN." });
      return Promise.resolve({ ok: true, name: users[k].name, progress: users[k].progress, assignments: users[k].assign || [] });
    }
    if (action === "save") {
      if (!users[k] || users[k].pin !== p.pin) return Promise.resolve({ ok: false, error: "auth" });
      users[k].progress = p.progress; users[k].summary = p.summary; users[k].updated = nowIso();
      users[k].attempts = (users[k].attempts || []).concat((p.attempts || []).map(function (x) { return { at: x.at, name: users[k].name, module: x.title || x.module, score: x.score, total: x.total, passed: !!x.passed }; }));
      return done({ ok: true });
    }
    if (action === "dashboard") {
      if (p.managerPin !== "demo") return Promise.resolve({ ok: false, error: "Wrong manager PIN (demo mode PIN is: demo)" });
      return Promise.resolve({ ok: true, users: Object.keys(users).map(function (x) { var u = users[x]; return { name: u.name, summary: u.summary || {}, progress: u.progress, updated: u.updated, assignments: u.assign || [] }; }) });
    }
    if (action === "resetPin") {
      if (p.managerPin !== "demo") return Promise.resolve({ ok: false, error: "Wrong manager PIN" });
      var uk = keyOf(p.name); if (!users[uk]) return Promise.resolve({ ok: false, error: "User not found" });
      users[uk].pin = p.newPin; return done({ ok: true });
    }
    if (action === "attempts") {
      if (p.managerPin !== "demo") return Promise.resolve({ ok: false, error: "Wrong manager PIN" });
      var all = []; Object.keys(users).forEach(function (x) { all = all.concat(users[x].attempts || []); });
      all.sort(function (x, y) { return String(y.at).localeCompare(String(x.at)); });
      return Promise.resolve({ ok: true, attempts: all });
    }
    if (action === "myAssignments") {
      if (!users[k] || users[k].pin !== p.pin) return Promise.resolve({ ok: false, error: "auth" });
      return Promise.resolve({ ok: true, assignments: users[k].assign || [] });
    }
    if (action === "assign" || action === "unassign") {
      if (p.managerPin !== "demo") return Promise.resolve({ ok: false, error: "Wrong manager PIN" });
      if (action === "unassign") { var uu = users[keyOf(p.name)]; if (uu) uu.assign = (uu.assign || []).filter(function (x) { return x.id !== p.moduleId; }); return done({ ok: true }); }
      (p.names || []).forEach(function (n) {
        var u2 = users[keyOf(n)]; if (!u2) return; u2.assign = u2.assign || [];
        (p.moduleIds || []).forEach(function (id) {
          var f = u2.assign.filter(function (x) { return x.id === id; })[0];
          if (f) f.due = p.due || ""; else u2.assign.push({ id: id, due: p.due || "" });
        });
      });
      return done({ ok: true });
    }
    if (action === "getContent") return Promise.resolve({ ok: true, modules: lsGet("pm_demo_content") || {} });
    if (action === "saveModule" || action === "deleteModule" || action === "deleteUser") {
      if (p.managerPin !== "demo") return Promise.resolve({ ok: false, error: "Wrong manager PIN" });
      var dc = lsGet("pm_demo_content") || {};
      if (action === "saveModule") { dc[p.module.id] = p.module; lsSet("pm_demo_content", dc); return Promise.resolve({ ok: true }); }
      if (action === "deleteModule") { delete dc[p.id]; lsSet("pm_demo_content", dc); return Promise.resolve({ ok: true }); }
      delete users[keyOf(p.name)]; return done({ ok: true });
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
      ["read", "quiz", "skills", "practice", "viewed"].forEach(function (k) { if (!progress[k]) progress[k] = {}; });
      lsSet("pm_progress_" + keyOf(session.name), progress);
      assignments = r.assignments || lsGet("pm_asg_" + keyOf(session.name)) || [];
      lsSet("pm_asg_" + keyOf(session.name), assignments); asgLoaded = true;
      renderTop(); location.hash = "#/"; route();
    }).catch(function () { err.textContent = "Can't reach the server. Check your internet and try again."; });
  }
  function logout() { if (session && syncStatus !== "saved") { clearTimeout(syncTimer); flush(); } session = null; progress = null; assignments = []; asgLoaded = false; localStorage.removeItem("pm_session"); renderTop(); renderLogin(); location.hash = "#/"; }

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
  function modCard(m) {
    var a = null; assignments.forEach(function (x) { if (x.id === m.id) a = x; });
    var pct = Math.round(100 * modFrac(m)), done = modDone(m), badge = "";
    if (a && a.due) { var od = !done && a.due < todayStr(); badge = '<div class="due' + (od ? " over" : "") + '">' + (done ? "✓ Done" : (od ? "⚠️ Overdue: was due " : "📅 Due ") + fmtDue(a.due)) + "</div>"; }
    return '<a class="mod" href="#/m/' + m.id + '"><div class="ico">' + m.icon + '</div><h3>' + esc(m.title) + '</h3><p>' + esc(m.blurb) + '</p>' + statusOf(m) + badge +
      '<div class="progress dark" style="margin-top:10px"><span style="width:' + pct + '%"></span></div></a>';
  }
  function renderHome() {
    var s = summary(), am = assignedMods(assignments), act = am || C.modules, next = null;
    for (var i = 0; i < act.length; i++) if (!modDone(act[i])) { next = act[i]; break; }
    var h = '<div class="card hero"><h1>Hi ' + esc(session.name.split(" ")[0]) + '! 👋</h1>' +
      '<p>' + (next ? (am ? 'You have ' + am.length + ' module' + (am.length === 1 ? "" : "s") + ' assigned to you. Pick up where you left off.' : 'Pick up where you left off, or choose any module below.') : (am ? 'You\'ve completed all your assigned modules. Amazing work!' : 'You\'ve completed every module. Amazing work!')) + '</p>' +
      (s.overdue ? '<p><strong>⚠️ ' + s.overdue + ' overdue module' + (s.overdue === 1 ? "" : "s") + '</strong></p>' : "") +
      '<div class="progress"><span style="width:' + s.percent + '%"></span></div>' +
      '<div class="stats"><div class="stat"><b>' + s.percent + '%</b>complete</div><div class="stat"><b>' + s.modulesDone + '/' + s.modulesTotal + '</b>modules done</div>' +
      '<div class="stat"><b>' + s.avgQuiz + '%</b>avg quiz score</div><div class="stat"><b>' + s.skillsAlone + '/' + s.skillsTotal + '</b>skills solo</div></div>' +
      '<div class="row noprint" style="margin-top:14px">' +
      (next ? '<a class="btn" style="background:#fff;color:#14509e;text-decoration:none" href="#/m/' + next.id + '">Continue: ' + esc(next.title) + '</a>' : '<a class="btn" style="background:#fff;color:#14509e;text-decoration:none" href="#/cert">🎓 View my certificate</a>') + '</div></div>' +
      '<input class="search" id="searchBox" type="search" placeholder="🔍 Search the training (e.g. refund, Hi-Float, bond)…" autocomplete="off">' +
      '<div id="searchOut"></div><div id="modGrid">';
    if (am) {
      h += '<h3>📌 Assigned to you</h3><div class="grid">' + am.map(modCard).join("") + "</div>";
      var rest = C.modules.filter(function (m) { return am.indexOf(m) < 0; });
      if (rest.length) h += '<h3>📚 Other modules (for reference)</h3><div class="grid">' + rest.map(modCard).join("") + "</div>";
    } else h += '<div class="grid">' + C.modules.map(modCard).join("") + "</div>";
    app.innerHTML = h + "</div>";
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

  function markViewed(id) {
    if (!progress) return;
    var v = progress.viewed || (progress.viewed = {}), now = nowIso(), e = v[id];
    if (!e) { v[id] = { first: now, last: now, n: 1 }; persist(); }
    else if (Date.parse(now) - Date.parse(e.last) > 600000) { e.last = now; e.n = (e.n || 1) + 1; persist(); }
  }
  function dueBanner(m) {
    var a = null; assignments.forEach(function (x) { if (x.id === m.id) a = x; });
    if (!a) return "";
    var done = modDone(m), od = a.due && !done && a.due < todayStr();
    return ' <span class="status' + (od ? "" : " prog") + '"' + (od ? ' style="background:#fdecea;color:#c0392b"' : "") + ">📌 Assigned" + (a.due ? " · " + (od ? "overdue, was due " : "due ") + fmtDue(a.due) : "") + "</span>";
  }
  function renderModule(id, tab, openLesson) {
    var m = modById(id);
    if (!m) { location.hash = "#/"; return; }
    markViewed(id);
    tab = tab || "learn";
    var tabs = [["learn", "📖 Learn"], ["skills", "✅ Skills"]];
    if (m.practice) tabs.push(["practice", "📝 Practice"]);
    tabs.push(["quiz", "🧠 Quiz"]);
    var h = '<div class="crumbs"><a href="#/">← All modules</a></div><h1>' + m.icon + " " + esc(m.title) + "</h1>" + statusOf(m) + dueBanner(m) +
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

  function refreshAssignments() {
    if (!session) return;
    api("myAssignments", { name: session.name, pin: session.pin }).then(function (r) {
      if (!r || !r.ok) return;
      var n = r.assignments || [];
      if (JSON.stringify(n) === JSON.stringify(assignments)) return;
      assignments = n; lsSet("pm_asg_" + keyOf(session.name), n);
      var h = location.hash || "#/";
      if (!quizState && (h === "#/" || h === "#")) route();
    }).catch(function () {});
  }

  /* ---------- editable content (edits are stored in the Google Sheet) ---------- */
  var BASE_MODULES = C.modules.slice();
  var overrides = lsGet("pm_content_over") || {};
  var allModules = [];
  function applyContent() {
    var out = [], seen = {};
    BASE_MODULES.forEach(function (b) { seen[b.id] = 1; var o = overrides[b.id]; out.push(o ? Object.assign({}, b, o) : b); });
    Object.keys(overrides).forEach(function (id) { if (!seen[id]) out.push(Object.assign({ skills: [], lessons: [], quiz: [], videos: [] }, overrides[id])); });
    allModules = out;
    C.modules = out.filter(function (m) { return !m.hidden; });
    searchIndex = null;
  }
  function fetchContent() {
    api("getContent", {}).then(function (r) {
      if (!r || !r.ok) return;
      var a = JSON.stringify(r.modules || {}), b = JSON.stringify(overrides);
      if (a === b) return;
      overrides = r.modules || {}; lsSet("pm_content_over", overrides); applyContent();
      var h = location.hash || "#/";
      if (!quizState && (h === "#/" || h === "#")) route();
    }).catch(function () {});
  }

  /* ---- manager area ---- */
  var mgrPin = null, mgrTab = "team", edit = null, mgrNotice = "";
  function renderManagerLogin(msg) {
    app.innerHTML = '<div class="card login"><h1>Manager</h1><p>See every hire\'s progress and edit the training.</p><div class="field"><label>Manager PIN</label><input type="password" id="mp" autocomplete="off"></div><div class="err">' + esc(msg || "") + '</div><div class="row"><button class="btn" data-act="mgrlogin">Open manager</button><a class="btn alt" style="text-decoration:none" href="#/">Back</a></div>' + (DEMO ? '<p class="muted">Demo mode PIN: demo</p>' : "") + "</div>";
  }
  function loadManager() {
    app.innerHTML = '<div class="card">Loading…</div>';
    api("dashboard", { managerPin: mgrPin }).then(function (r) {
      if (!r || !r.ok) { mgrPin = null; renderManagerLogin((r && r.error) || "Couldn't load"); return; }
      var us = r.users || [];
      us.sort(function (a, b) { return String(b.updated).localeCompare(String(a.updated)); });
      window._pmUsers = us;
      renderManager();
    }).catch(function () { mgrPin = null; renderManagerLogin("Can't reach the server"); });
  }
  function mtab(k, label) { return '<button class="tab' + (mgrTab === k ? " on" : "") + '" data-act="mgrtab" data-tab="' + k + '">' + label + "</button>"; }
  function renderManager() {
    var y = window.scrollY;
    var h = '<div class="crumbs"><a href="#/">← Back to training</a></div><h1>Manager</h1><div class="tabs">' + mtab("team", "👥 Team") + mtab("activity", "📊 Quiz activity") + mtab("assign", "📌 Assign") + mtab("content", "✏️ Edit training") + "</div>";
    if (mgrNotice) { h += '<div class="tip">' + esc(mgrNotice) + "</div>"; mgrNotice = ""; }
    h += mgrTab === "team" ? teamView() : mgrTab === "activity" ? activityView() : mgrTab === "assign" ? assignView() : (edit ? editView() : contentList());
    app.innerHTML = h;
    window.scrollTo(0, y);
  }

  /* ---- team tab ---- */
  function teamView() {
    var us = window._pmUsers || [];
    var h = '<p class="muted">' + us.length + " hire(s). Tap a name to see detail, set a new PIN, or remove them.</p>" +
      '<div class="card"><table><tr><th>Name</th><th>Progress</th><th>Modules</th><th>Avg quiz</th><th>Assigned</th><th>Last active</th></tr>';
    us.forEach(function (u, i) {
      var s = statsFor(u.progress || {}, u.assignments), na = (u.assignments || []).length;
      h += '<tr data-act="mgrdetail" data-i="' + i + '" style="cursor:pointer"><td><strong>' + esc(u.name) + "</strong></td><td>" + s.percent + "%</td><td>" + s.modulesDone + "/" + s.modulesTotal + "</td><td>" + s.avgQuiz + "%</td><td>" + (na ? na + " assigned" + (s.overdue ? ' · <span style="color:#c0392b;font-weight:700">' + s.overdue + " overdue</span>" : "") : "-") + "</td><td>" + fmtDateTime(u.updated) + "</td></tr>";
    });
    h += '</table></div><div id="mgrDetail"></div>' +
      '<div class="card"><h3 style="margin-top:0">Add a hire</h3><div class="row"><div class="field" style="flex:2;min-width:180px"><label>Full name</label><input id="ah_name" type="text"></div><div class="field" style="flex:1;min-width:110px"><label>4-digit PIN</label><input id="ah_pin" type="text" inputmode="numeric" maxlength="4"></div></div><div class="row"><button class="btn sm" data-act="mgraddhire">Add hire</button></div><div class="err" id="ah_msg"></div></div>';
    return h;
  }
  function showDetail(i) {
    var u = window._pmUsers[i], p = u.progress || {}, el = document.getElementById("mgrDetail");
    var h = '<div class="card"><h2 style="margin-top:0">' + esc(u.name) + '</h2><table><tr><th>Module</th><th>Opened</th><th>Lessons read</th><th>Quiz best</th><th>Attempts</th><th>Retakes</th><th>Skills solo</th></tr>';
    C.modules.forEach(function (m) {
      var read = ((p.read || {})[m.id] || []).length, q = (p.quiz || {})[m.id], sk = (p.skills || {})[m.id] || {}, alone = 0;
      Object.keys(sk).forEach(function (k) { if (sk[k] && sk[k][2]) alone++; });
      var vw = (p.viewed || {})[m.id];
      h += "<tr><td>" + m.icon + " " + esc(m.title) + "</td><td>" + (vw ? fmtDate(vw.first) : (read || q ? "yes" : "-")) + "</td><td>" + read + "/" + m.lessons.length + "</td><td>" + (q ? q.best + "/" + q.total + (q.passed ? " ✓" : "") : "not taken") + "</td><td>" + (q ? q.attempts : 0) + "</td><td>" + (q ? Math.max(0, q.attempts - 1) : 0) + "</td><td>" + alone + "/" + m.skills.length + "</td></tr>";
    });
    h += "</table>";
    var asg = u.assignments || [];
    h += "<h4>Assigned modules</h4>";
    if (!asg.length) h += '<p class="muted">Nothing assigned: they see every module. Use the Assign tab to give them specific modules and due dates.</p>';
    else {
      h += "<table><tr><th>Module</th><th>Due</th><th>Status</th><th></th></tr>";
      asg.forEach(function (x) {
        var m = modById(x.id); if (!m) return;
        var dn = modDoneP(m, p), od = x.due && !dn && x.due < todayStr();
        h += "<tr><td>" + m.icon + " " + esc(m.title) + "</td><td>" + (x.due ? fmtDue(x.due) : "-") + "</td><td>" + (dn ? "✓ Done" : od ? '<span style="color:#c0392b;font-weight:700">Overdue</span>' : "To do") + '</td><td><button class="btn alt sm" data-act="mgrunassign" data-i="' + i + '" data-id="' + esc(x.id) + '">Remove</button></td></tr>';
      });
      h += "</table>";
    }
    h += '<h4>PIN</h4><p class="muted">PINs are stored scrambled, so the old one can\'t be shown. Set a new one and tell ' + esc(u.name.split(" ")[0]) + '.</p>' +
      '<div class="row"><input id="np_pin" type="text" inputmode="numeric" maxlength="4" placeholder="New 4-digit PIN" style="max-width:200px"><button class="btn sm" data-act="mgrsetpin" data-i="' + i + '">Set PIN</button><button class="btn alt sm" data-act="mgrdel" data-i="' + i + '">Delete this hire</button></div><div id="np_msg" class="muted" style="margin-top:8px"></div></div>';
    el.innerHTML = h; el.scrollIntoView({ behavior: "smooth" });
  }

  /* ---- quiz activity tab ---- */
  function actInfo(m, p) {
    var v = (p.viewed || {})[m.id], q = (p.quiz || {})[m.id], rd = ((p.read || {})[m.id] || []).length;
    return { viewed: !!(v || rd || q), v: v, q: q, rd: rd };
  }
  function actCell(m, p) {
    var i = actInfo(m, p), q = i.q;
    if (!i.viewed) return '<td title="Not opened yet" style="color:#aab4c0">–</td>';
    if (!q) return '<td title="Opened (' + i.rd + "/" + m.lessons.length + ' lessons read). Quiz not taken yet.">👁</td>';
    var n = q.attempts || 1, tip = "Best " + q.best + "/" + q.total + " · " + n + " attempt" + (n === 1 ? "" : "s") + (n > 1 ? " (" + (n - 1) + " retake" + (n === 2 ? "" : "s") + ")" : "") + (q.passed ? " · passed" : " · not passed yet");
    return '<td title="' + esc(tip) + '"' + (n >= 3 ? ' style="background:#fff4e0"' : "") + ">" + (q.passed ? "✅" : "❌") + " ×" + n + "</td>";
  }
  function activityView() {
    var us = window._pmUsers || [], mods = C.modules;
    var h = '<p class="muted">Who has opened each module, who has taken the quiz, and how many attempts it took. A retake is any attempt after the first.</p>';
    if (!us.length) return h + '<div class="card">No hires yet.</div>';
    h += '<div class="card"><h3 style="margin-top:0">Summary</h3><table><tr><th>Name</th><th>Modules opened</th><th>Quizzes taken</th><th>Quizzes passed</th><th>Total attempts</th><th>Retakes</th><th>Last quiz</th></tr>';
    us.forEach(function (u) {
      var p = u.progress || {}, opened = 0, taken = 0, passed = 0, att = 0, retakes = 0, last = "";
      mods.forEach(function (m) {
        var i = actInfo(m, p); if (i.viewed) opened++;
        if (i.q) { taken++; if (i.q.passed) passed++; att += i.q.attempts || 1; retakes += Math.max(0, (i.q.attempts || 1) - 1); if (i.q.at && String(i.q.at) > last) last = i.q.at; }
      });
      h += "<tr><td><strong>" + esc(u.name) + "</strong></td><td>" + opened + "/" + mods.length + "</td><td>" + taken + "/" + mods.length + "</td><td>" + passed + "/" + mods.length + "</td><td>" + att + "</td><td" + (retakes >= 5 ? ' style="background:#fff4e0;font-weight:700"' : "") + ">" + retakes + "</td><td>" + (last ? fmtDateTime(last) : "-") + "</td></tr>";
    });
    h += '</table></div><div class="card"><h3 style="margin-top:0">Module by module</h3><p class="muted">– not opened · 👁 opened, quiz not taken · ❌ ×n quiz taken n times, not passed yet · ✅ ×n passed after n attempts · amber = 3 or more attempts. Hover (or press and hold) a cell for the score.</p><table class="mx"><tr><th>Name</th>';
    mods.forEach(function (m) { h += '<th title="' + esc(m.title) + '" style="text-align:center">' + esc(m.icon) + "</th>"; });
    h += "</tr>";
    us.forEach(function (u) { h += "<tr><td><strong>" + esc(u.name) + "</strong></td>"; mods.forEach(function (m) { h += actCell(m, u.progress || {}); }); h += "</tr>"; });
    h += '</table></div><div class="card"><h3 style="margin-top:0">Every quiz attempt</h3><div class="row"><select id="act_f" style="max-width:260px"><option value="">All hires</option>';
    us.forEach(function (u) { h += '<option value="' + esc(u.name) + '">' + esc(u.name) + "</option>"; });
    h += '</select></div><div id="actLog" style="margin-top:8px">' + attemptsLogHtml("") + "</div></div>";
    return h;
  }
  function attemptsLogHtml(filter) {
    var at = window._pmAtt;
    if (!at) return '<p class="muted">Loading…</p>';
    var rows = at.filter(function (x) { return !filter || x.name === filter; }).slice(0, 300);
    if (!rows.length) return '<p class="muted">No quiz attempts yet.</p>';
    var out = "<table><tr><th>When</th><th>Hire</th><th>Module</th><th>Score</th><th>Result</th></tr>";
    rows.forEach(function (x) { out += "<tr><td>" + fmtDateTime(x.at) + "</td><td>" + esc(x.name) + "</td><td>" + esc(x.module) + "</td><td>" + x.score + "/" + x.total + "</td><td>" + (x.passed ? "✅ Passed" : "❌ Not passed") + "</td></tr>"; });
    return out + "</table>" + (at.length > 300 ? '<p class="muted">Showing the latest 300.</p>' : "");
  }
  function loadAttempts() {
    api("attempts", { managerPin: mgrPin }).then(function (r) {
      window._pmAtt = r && r.ok ? r.attempts : [];
      var el = document.getElementById("actLog"), f = document.getElementById("act_f");
      if (el) el.innerHTML = attemptsLogHtml(f ? f.value : "");
    }).catch(function () { window._pmAtt = []; var el = document.getElementById("actLog"); if (el) el.innerHTML = '<p class="muted">Couldn\'t load the attempts log.</p>'; });
  }

  /* ---- assign tab ---- */
  function assignView() {
    var us = window._pmUsers || [];
    var h = '<p class="muted">Pick modules, pick hires, and optionally set a due date. Hires with assigned modules see them at the top of their home page, and their progress and overdue warnings are based on those modules. They can still open every other module. Assigning a module again with a new date changes its due date.</p>' +
      '<div class="card"><h3 style="margin-top:0">1. Modules</h3><div class="row" style="margin-bottom:6px"><button class="btn alt sm" data-act="asall" data-grp="as_m" data-on="1">Select all</button><button class="btn alt sm" data-act="asall" data-grp="as_m" data-on="0">Clear</button></div>';
    C.modules.forEach(function (m) { h += '<label style="display:block;margin:5px 0"><input type="checkbox" class="as_m" value="' + esc(m.id) + '"> ' + esc(m.icon) + " " + esc(m.title) + "</label>"; });
    h += '<h3>2. Hires</h3>';
    if (!us.length) h += '<p class="muted">No hires yet. Add one on the Team tab, or wait for them to register.</p>';
    else {
      h += '<div class="row" style="margin-bottom:6px"><button class="btn alt sm" data-act="asall" data-grp="as_u" data-on="1">Everyone</button><button class="btn alt sm" data-act="asall" data-grp="as_u" data-on="0">Clear</button></div>';
      us.forEach(function (u, i) { h += '<label style="display:block;margin:5px 0"><input type="checkbox" class="as_u" value="' + i + '"> ' + esc(u.name) + "</label>"; });
    }
    h += '<h3>3. Due date (optional)</h3><input type="date" id="as_due" style="max-width:220px;padding:10px;border:1px solid var(--line);border-radius:10px;font:inherit">' +
      '<div class="row" style="margin-top:14px"><button class="btn" data-act="asgo">Assign</button></div><div id="as_msg" class="muted" style="margin-top:8px"></div></div>';
    return h;
  }

  /* ---- edit training tab ---- */
  function isBase(id) { return BASE_MODULES.some(function (b) { return b.id === id; }); }
  function contentList() {
    var h = '<p class="muted">Change lessons, quiz questions, skills and videos. Changes go live for hires the next time they open or refresh the site.</p>';
    allModules.forEach(function (m) {
      var tags = (overrides[m.id] && isBase(m.id) ? " · ✎ edited" : "") + (!isBase(m.id) ? " · custom module" : "") + (m.hidden ? " · hidden from hires" : "");
      h += '<div class="card" style="display:flex;gap:12px;align-items:center;flex-wrap:wrap"><div style="flex:1;min-width:200px"><strong>' + esc(m.icon) + " " + esc(m.title) + '</strong><div class="muted">' + m.lessons.length + " lessons · " + m.quiz.length + " quiz questions" + tags + '</div></div><button class="btn sm" data-act="edmod" data-id="' + esc(m.id) + '">Edit</button></div>';
    });
    return h + '<div class="row"><button class="btn" data-act="ednew">+ Add a new module</button></div>';
  }
  function draftFrom(m) {
    return JSON.parse(JSON.stringify({ id: m.id, icon: m.icon, title: m.title, blurb: m.blurb || "", hidden: !!m.hidden, lessons: m.lessons || [], skills: m.skills || [], quiz: m.quiz || [], videos: m.videos || [] }));
  }
  function tbar() {
    return '<div class="tbar"><button data-act="fmt" data-cmd="bold"><b>B</b></button><button data-act="fmt" data-cmd="h4">Heading</button><button data-act="fmt" data-cmd="p">Normal</button><button data-act="fmt" data-cmd="ul">• List</button><button data-act="fmt" data-cmd="ol">1. List</button><button data-act="fmt" data-cmd="tip">💡 Tip box</button><button data-act="fmt" data-cmd="src">&lt;/&gt; HTML</button></div>';
  }
  function editView() {
    var d = edit.draft;
    var h = '<div class="crumbs"><button class="tab" data-act="edback">← All modules</button></div><h2>' + (edit.isNew ? "New module" : "Edit: " + esc(d.title)) + '</h2>' +
      '<div class="row noprint"><button class="btn" data-act="edsave">Save changes</button><span class="edmsg muted"></span></div>' +
      '<div class="card"><div class="row"><div class="field" style="flex:0 0 90px"><label>Icon</label><input id="ed_icon" type="text" maxlength="4" value="' + esc(d.icon) + '"></div><div class="field" style="flex:1;min-width:220px"><label>Module title</label><input id="ed_title" type="text" value="' + esc(d.title) + '"></div></div>' +
      '<div class="field"><label>Short description (shown on the home page)</label><input id="ed_blurb" type="text" value="' + esc(d.blurb) + '"></div>' +
      '<div class="field"><label><input type="checkbox" id="ed_hidden"' + (d.hidden ? " checked" : "") + '> Hide this module from hires</label></div></div>';
    h += "<h3>📖 Lessons</h3>";
    d.lessons.forEach(function (l, i) {
      h += '<div class="card ed lesson"><div class="row" style="justify-content:space-between"><strong>Lesson ' + (i + 1) + '</strong><span><button class="btn alt sm" data-act="lmove" data-i="' + i + '" data-d="-1">↑</button> <button class="btn alt sm" data-act="lmove" data-i="' + i + '" data-d="1">↓</button> <button class="btn alt sm" data-act="ldel" data-i="' + i + '">Delete</button></span></div>' +
        '<div class="field"><label>Lesson title</label><input class="l_title" type="text" value="' + esc(l.title) + '"></div>' + tbar() +
        '<div class="rte" contenteditable="true">' + l.body + '</div><textarea class="l_src" rows="10" style="display:none;font-family:monospace;font-size:.85rem"></textarea></div>';
    });
    h += '<div class="row"><button class="btn alt sm" data-act="ladd">+ Add a lesson</button></div>';
    h += '<h3>✅ Skills to tick off</h3><div class="card"><div class="field"><label>One skill per line</label><textarea id="ed_skills" rows="6">' + esc(d.skills.join("\n")) + "</textarea></div></div>";
    h += "<h3>🎬 Videos</h3><div class=\"card\"><p class=\"muted\">Paste a link (YouTube, Google Drive) or a file path like <code>assets/videos/name.mp4</code>. Leave the link empty to show \"Ask your trainer\".</p>";
    d.videos.forEach(function (v, i) {
      h += '<div class="row vrow" style="align-items:flex-end"><div class="field" style="flex:1;min-width:150px"><label>Title</label><input class="v_title" type="text" value="' + esc(v.title) + '"></div><div class="field" style="flex:2;min-width:180px"><label>Link or file</label><input class="v_url" type="text" value="' + esc(v.url) + '"></div><button class="btn alt sm" data-act="vdel" data-i="' + i + '" style="margin-bottom:10px">✕</button></div>';
    });
    h += '<button class="btn alt sm" data-act="vadd">+ Add a video</button></div>';
    h += '<h3>🧠 Quiz questions</h3><p class="muted">Tick the circle next to the correct answer. Leave unused answer boxes empty.</p>';
    d.quiz.forEach(function (q, i) {
      var n = Math.max(4, q.o.length), opts = "";
      for (var k = 0; k < n; k++) opts += '<div class="row" style="flex-wrap:nowrap;gap:8px;margin:4px 0"><input type="radio" name="qc' + i + '" value="' + k + '"' + (q.a === k ? " checked" : "") + ' style="width:20px;height:20px;flex:none"><input class="q_opt" type="text" placeholder="Answer ' + (k + 1) + '" value="' + esc(q.o[k] || "") + '"></div>';
      h += '<div class="card ed qcard"><div class="row" style="justify-content:space-between"><strong>Question ' + (i + 1) + '</strong><span><button class="btn alt sm" data-act="qmove" data-i="' + i + '" data-d="-1">↑</button> <button class="btn alt sm" data-act="qmove" data-i="' + i + '" data-d="1">↓</button> <button class="btn alt sm" data-act="qdel" data-i="' + i + '">Delete</button></span></div>' +
        '<div class="field"><label>Question</label><input class="q_q" type="text" value="' + esc(q.q) + '"></div>' + opts +
        '<div class="field"><label>Why it\'s right (shown after they answer)</label><input class="q_w" type="text" value="' + esc(q.w) + '"></div></div>';
    });
    h += '<div class="row"><button class="btn alt sm" data-act="qadd">+ Add a question</button></div>';
    h += '<div class="row noprint" style="margin-top:18px"><button class="btn" data-act="edsave">Save changes</button><span class="edmsg muted"></span></div>';
    if (!edit.isNew) h += '<div class="row" style="margin-top:22px"><button class="btn alt sm" data-act="eddelete">' + (isBase(d.id) ? (overrides[d.id] ? "Reset this module to the original" : "") : "Delete this module") + "</button></div>";
    return h;
  }
  function collectDraft() {
    var d = edit.draft, g = function (id) { var e = document.getElementById(id); return e ? e.value : ""; };
    d.icon = g("ed_icon").trim() || "📘"; d.title = g("ed_title").trim(); d.blurb = g("ed_blurb").trim();
    var hc = document.getElementById("ed_hidden"); d.hidden = !!(hc && hc.checked);
    d.skills = g("ed_skills").split("\n").map(function (x) { return x.trim(); }).filter(Boolean);
    d.lessons = [].map.call(document.querySelectorAll(".ed.lesson"), function (card) {
      var rte = card.querySelector(".rte"), src = card.querySelector(".l_src");
      return { title: card.querySelector(".l_title").value.trim(), body: (src.style.display === "none" ? rte.innerHTML : src.value).trim() };
    });
    d.videos = [].map.call(document.querySelectorAll(".vrow"), function (r) { return { title: r.querySelector(".v_title").value.trim(), url: r.querySelector(".v_url").value.trim() }; }).filter(function (v) { return v.title; });
    d.quiz = [].map.call(document.querySelectorAll(".ed.qcard"), function (card) {
      var opts = [], correct = -1, chosen = card.querySelector("input[type=radio]:checked");
      [].forEach.call(card.querySelectorAll(".q_opt"), function (inp, k) {
        var v = inp.value.trim();
        if (v) { if (chosen && parseInt(chosen.value, 10) === k) correct = opts.length; opts.push(v); }
      });
      return { q: card.querySelector(".q_q").value.trim(), o: opts, a: correct, w: card.querySelector(".q_w").value.trim() };
    });
  }
  function validateDraft(d) {
    if (!d.title) return "Please give the module a title.";
    if (!d.lessons.length) return "Add at least one lesson.";
    for (var i = 0; i < d.lessons.length; i++) {
      if (!d.lessons[i].title) return "Lesson " + (i + 1) + " needs a title.";
      if (!strip(d.lessons[i].body)) return "Lesson " + (i + 1) + " is empty.";
    }
    if (!d.quiz.length) return "Add at least one quiz question (hires need it to complete the module).";
    for (var j = 0; j < d.quiz.length; j++) {
      var q = d.quiz[j];
      if (!q.q) return "Question " + (j + 1) + " needs the question text.";
      if (q.o.length < 2) return "Question " + (j + 1) + " needs at least 2 answers.";
      if (q.a < 0) return "Question " + (j + 1) + ": tick the circle next to the correct answer (it must have text).";
    }
    return "";
  }
  function edMsg(text, bad) {
    [].forEach.call(document.querySelectorAll(".edmsg"), function (e) { e.textContent = text; e.style.color = bad ? "#c0392b" : ""; });
  }
  function saveEdit() {
    collectDraft();
    var d = edit.draft, err = validateDraft(d);
    if (err) { edMsg("⚠️ " + err, true); return; }
    edMsg("Saving…");
    var payload = JSON.parse(JSON.stringify(d));
    api("saveModule", { managerPin: mgrPin, module: payload }).then(function (r) {
      if (!r || !r.ok) { edMsg("⚠️ " + ((r && r.error) || "Couldn't save. Try again."), true); return; }
      overrides[payload.id] = payload; lsSet("pm_content_over", overrides); applyContent();
      edit.isNew = false;
      edMsg("✓ Saved. Hires will see this next time they open or refresh the site.");
    }).catch(function () { edMsg("⚠️ Can't reach the server. Check your internet and try again.", true); });
  }
  function doFmt(t) {
    var cmd = t.getAttribute("data-cmd"), card = t.closest(".ed"), rte = card.querySelector(".rte"), src = card.querySelector(".l_src");
    if (cmd === "src") {
      if (src.style.display === "none") { src.value = rte.innerHTML; src.style.display = ""; rte.style.display = "none"; t.textContent = "Visual view"; }
      else { rte.innerHTML = src.value; src.style.display = "none"; rte.style.display = ""; t.textContent = "</> HTML"; }
      return;
    }
    if (rte.style.display === "none") return;
    rte.focus();
    if (cmd === "bold") document.execCommand("bold");
    else if (cmd === "ul") document.execCommand("insertUnorderedList");
    else if (cmd === "ol") document.execCommand("insertOrderedList");
    else if (cmd === "h4") document.execCommand("formatBlock", false, "h4");
    else if (cmd === "p") document.execCommand("formatBlock", false, "p");
    else if (cmd === "tip") { var sel = String(window.getSelection()) || "Tip text"; document.execCommand("insertHTML", false, '<div class="tip">' + esc(sel) + "</div><p><br></p>"); }
  }
  function moveIn(arr, i, d) { var j = i + d; if (j < 0 || j >= arr.length) return; var t = arr[i]; arr[i] = arr[j]; arr[j] = t; }

  /* ---------- router ---------- */
  function route() {
    renderTop();
    var parts = (location.hash || "#/").replace(/^#\/?/, "").split("/");
    if (parts[0] === "manager") { if (mgrPin) loadManager(); else renderManagerLogin(); return; }
    if (!session) { renderLogin(); return; }
    if (!progress) {
      progress = lsGet("pm_progress_" + keyOf(session.name)) || blankProgress();
      ["read", "quiz", "skills", "practice", "viewed"].forEach(function (k) { if (!progress[k]) progress[k] = {}; });
    }
    if (!asgLoaded) { asgLoaded = true; assignments = lsGet("pm_asg_" + keyOf(session.name)) || []; refreshAssignments(); }
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
      case "mgrtab":
        if (edit && mgrTab === "content") collectDraft();
        mgrTab = t.getAttribute("data-tab"); renderManager();
        if (mgrTab === "activity") loadAttempts();
        break;
      case "asall": [].forEach.call(document.querySelectorAll("." + t.getAttribute("data-grp")), function (c) { c.checked = t.getAttribute("data-on") === "1"; }); break;
      case "asgo":
        var mids = [].map.call(document.querySelectorAll(".as_m:checked"), function (c) { return c.value; });
        var anames = [].map.call(document.querySelectorAll(".as_u:checked"), function (c) { return window._pmUsers[parseInt(c.value, 10)].name; });
        var amsg = document.getElementById("as_msg");
        if (!mids.length || !anames.length) { amsg.textContent = "Pick at least one module and one hire."; break; }
        amsg.textContent = "Saving…";
        api("assign", { managerPin: mgrPin, names: anames, moduleIds: mids, due: document.getElementById("as_due").value || "" }).then(function (r) {
          if (r && r.ok) { mgrNotice = "Assigned " + mids.length + " module" + (mids.length === 1 ? "" : "s") + " to " + anames.length + " hire" + (anames.length === 1 ? "" : "s") + ". They'll see it next time they open the site."; loadManager(); }
          else amsg.textContent = (r && r.error) || "Couldn't save";
        });
        break;
      case "mgrunassign":
        var uu = window._pmUsers[parseInt(t.getAttribute("data-i"), 10)];
        api("unassign", { managerPin: mgrPin, name: uu.name, moduleId: id }).then(function (r) { mgrNotice = r && r.ok ? "Assignment removed." : ((r && r.error) || "Couldn't remove"); mgrTab = "team"; loadManager(); });
        break;
      case "mgrdetail": showDetail(parseInt(t.getAttribute("data-i"), 10)); break;
      case "mgrsetpin":
        var su = window._pmUsers[parseInt(t.getAttribute("data-i"), 10)], npv = document.getElementById("np_pin").value.trim(), nm = document.getElementById("np_msg");
        if (!/^\d{4}$/.test(npv)) { nm.textContent = "The PIN must be exactly 4 digits."; break; }
        nm.textContent = "Saving…";
        api("resetPin", { managerPin: mgrPin, name: su.name, newPin: npv }).then(function (r) { nm.textContent = r && r.ok ? "✓ Done. " + su.name + " can now log in with PIN " + npv + "." : ((r && r.error) || "Failed"); });
        break;
      case "mgrdel":
        var du = window._pmUsers[parseInt(t.getAttribute("data-i"), 10)];
        if (confirm("Delete " + du.name + " and all their progress? This cannot be undone.")) api("deleteUser", { managerPin: mgrPin, name: du.name }).then(function (r) { mgrNotice = r && r.ok ? du.name + " was deleted." : ((r && r.error) || "Couldn't delete"); loadManager(); });
        break;
      case "mgraddhire":
        var an = document.getElementById("ah_name").value.trim(), ap = document.getElementById("ah_pin").value.trim(), am = document.getElementById("ah_msg");
        if (an.length < 3 || an.indexOf(" ") < 0) { am.textContent = "Enter first and last name."; break; }
        if (!/^\d{4}$/.test(ap)) { am.textContent = "The PIN must be exactly 4 digits."; break; }
        api("register", { name: an, pin: ap }).then(function (r) { if (r && r.ok) { mgrNotice = an + " added with PIN " + ap + "."; loadManager(); } else am.textContent = (r && r.error) || "Couldn't add"; });
        break;
      case "edmod": var em = allModules.filter(function (m) { return m.id === id; })[0]; edit = { isNew: false, draft: draftFrom(em) }; renderManager(); window.scrollTo(0, 0); break;
      case "ednew": edit = { isNew: true, draft: { id: "m" + Date.now().toString(36), icon: "📘", title: "", blurb: "", hidden: false, lessons: [{ title: "", body: "<p></p>" }], skills: [], quiz: [{ q: "", o: ["", "", "", ""], a: 0, w: "" }], videos: [] } }; renderManager(); window.scrollTo(0, 0); break;
      case "edback": edit = null; renderManager(); break;
      case "edsave": saveEdit(); break;
      case "fmt": doFmt(t); break;
      case "ladd": collectDraft(); edit.draft.lessons.push({ title: "", body: "<p></p>" }); renderManager(); break;
      case "ldel": collectDraft(); if (confirm("Delete this lesson?")) edit.draft.lessons.splice(parseInt(t.getAttribute("data-i"), 10), 1); renderManager(); break;
      case "lmove": collectDraft(); moveIn(edit.draft.lessons, parseInt(t.getAttribute("data-i"), 10), parseInt(t.getAttribute("data-d"), 10)); renderManager(); break;
      case "qadd": collectDraft(); edit.draft.quiz.push({ q: "", o: ["", "", "", ""], a: 0, w: "" }); renderManager(); break;
      case "qdel": collectDraft(); if (confirm("Delete this question?")) edit.draft.quiz.splice(parseInt(t.getAttribute("data-i"), 10), 1); renderManager(); break;
      case "qmove": collectDraft(); moveIn(edit.draft.quiz, parseInt(t.getAttribute("data-i"), 10), parseInt(t.getAttribute("data-d"), 10)); renderManager(); break;
      case "vadd": collectDraft(); edit.draft.videos.push({ title: "", url: "" }); renderManager(); break;
      case "vdel": collectDraft(); edit.draft.videos.splice(parseInt(t.getAttribute("data-i"), 10), 1); renderManager(); break;
      case "eddelete":
        var dm = edit.draft.id, custom = !isBase(dm);
        if (confirm(custom ? "Delete this module for good?" : "Throw away your edits and go back to the original version of this module?")) {
          api("deleteModule", { managerPin: mgrPin, id: dm }).then(function (r) {
            if (r && r.ok) { delete overrides[dm]; lsSet("pm_content_over", overrides); applyContent(); edit = null; mgrNotice = custom ? "Module deleted." : "Module reset to the original."; renderManager(); }
          });
        }
        break;
    }
  });
  document.addEventListener("change", function (e) {
    var t = e.target;
    if (t.id === "act_f") { var lg = document.getElementById("actLog"); if (lg) lg.innerHTML = attemptsLogHtml(t.value); return; }
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

  document.addEventListener("mousedown", function (e) { if (e.target.closest && e.target.closest('[data-act="fmt"]')) e.preventDefault(); });
  document.addEventListener("paste", function (e) {
    if (!e.target.closest || !e.target.closest(".rte")) return;
    e.preventDefault();
    var txt = (e.clipboardData || window.clipboardData).getData("text/plain");
    document.execCommand("insertText", false, txt);
  });

  applyContent();
  route();
  fetchContent();
})();
