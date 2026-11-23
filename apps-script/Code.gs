/**
 * Party Mix Perth Training Academy - backend
 * Paste this into Extensions > Apps Script of a Google Sheet, then deploy as a web app.
 * Sheets (tabs) are created automatically: "Users" and "Attempts".
 */
var MANAGER_PIN = "CHANGE-ME-1234";      // <-- change this before deploying
var SALT = "pm-perth-2026-change-me";   // <-- change to any random text (do not change after people register)

function doGet() { return out_({ ok: true, msg: "Party Mix training API is running" }); }

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    var p = JSON.parse(e.postData.contents);
    switch (p.action) {
      case "register": return out_(register_(p));
      case "login": return out_(login_(p));
      case "save": return out_(save_(p));
      case "dashboard": return out_(dashboard_(p));
      case "resetPin": return out_(resetPin_(p));
      default: return out_({ ok: false, error: "Unknown action" });
    }
  } catch (err) {
    return out_({ ok: false, error: "Server error: " + err });
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
}

function out_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

function sheet_(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet(), sh = ss.getSheetByName(name);
  if (!sh) { sh = ss.insertSheet(name); sh.appendRow(headers); sh.setFrozenRows(1); }
  return sh;
}
function users_() { return sheet_("Users", ["Key", "Name", "PIN hash", "Progress JSON", "Percent", "Modules done", "Avg quiz %", "Skills solo", "Registered", "Last active"]); }
function attempts_() { return sheet_("Attempts", ["When", "Name", "Module", "Score", "Out of", "Passed"]); }

function key_(name) { return String(name || "").trim().toLowerCase().replace(/\s+/g, " "); }
function hash_(pin) {
  var raw = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, SALT + ":" + pin);
  return raw.map(function (b) { return ("0" + (b & 0xff).toString(16)).slice(-2); }).join("");
}
function valid_(p) { return p.name && String(p.name).trim().length >= 3 && /^\d{4}$/.test(String(p.pin || "")); }

function findRow_(sh, key) {
  var last = sh.getLastRow();
  if (last < 2) return -1;
  var keys = sh.getRange(2, 1, last - 1, 1).getValues();
  for (var i = 0; i < keys.length; i++) if (keys[i][0] === key) return i + 2;
  return -1;
}

function register_(p) {
  if (!valid_(p)) return { ok: false, error: "Enter your full name and a 4-digit PIN." };
  var sh = users_(), k = key_(p.name);
  if (findRow_(sh, k) > 0) return { ok: false, error: "That name is already registered. Log in instead, or use your full name." };
  var now = new Date();
  sh.appendRow([k, String(p.name).trim(), hash_(p.pin), "", 0, 0, 0, 0, now, now]);
  return { ok: true, name: String(p.name).trim(), progress: null };
}

function login_(p) {
  if (!valid_(p)) return { ok: false, error: "Enter your full name and 4-digit PIN." };
  var sh = users_(), r = findRow_(sh, key_(p.name));
  if (r < 0) return { ok: false, error: "Name or PIN not right. Check your spelling or ask your manager to reset your PIN." };
  var row = sh.getRange(r, 1, 1, 10).getValues()[0];
  if (row[2] !== hash_(p.pin)) return { ok: false, error: "Name or PIN not right. Check your spelling or ask your manager to reset your PIN." };
  var prog = null;
  try { prog = row[3] ? JSON.parse(row[3]) : null; } catch (e) {}
  return { ok: true, name: row[1], progress: prog };
}

function save_(p) {
  var sh = users_(), r = findRow_(sh, key_(p.name));
  if (r < 0) return { ok: false, error: "auth" };
  var row = sh.getRange(r, 1, 1, 3).getValues()[0];
  if (row[2] !== hash_(p.pin)) return { ok: false, error: "auth" };
  var s = p.summary || {};
  var json = JSON.stringify(p.progress || {});
  if (json.length > 45000) return { ok: false, error: "Progress too large" };
  sh.getRange(r, 4, 1, 7).setValues([[json, s.percent || 0, s.modulesDone || 0, s.avgQuiz || 0, s.skillsAlone || 0, sh.getRange(r, 9).getValue(), new Date()]]);
  var at = p.attempts || [];
  if (at.length) {
    var a = attempts_(), rows = at.slice(0, 20).map(function (x) {
      return [new Date(x.at || new Date()), row[1] || p.name, x.title || x.module, x.score, x.total, x.passed ? "Yes" : "No"];
    });
    a.getRange(a.getLastRow() + 1, 1, rows.length, 6).setValues(rows);
  }
  return { ok: true };
}

function dashboard_(p) {
  if (p.managerPin !== MANAGER_PIN) return { ok: false, error: "Wrong manager PIN" };
  var sh = users_(), last = sh.getLastRow();
  if (last < 2) return { ok: true, users: [] };
  var rows = sh.getRange(2, 1, last - 1, 10).getValues();
  return {
    ok: true,
    users: rows.map(function (r) {
      var prog = null;
      try { prog = r[3] ? JSON.parse(r[3]) : null; } catch (e) {}
      return { name: r[1], progress: prog, updated: r[9] instanceof Date ? r[9].toISOString() : r[9],
        summary: { percent: r[4], modulesDone: r[5], modulesTotal: 13, avgQuiz: r[6], skillsAlone: r[7] } };
    })
  };
}

function resetPin_(p) {
  if (p.managerPin !== MANAGER_PIN) return { ok: false, error: "Wrong manager PIN" };
  if (!/^\d{4}$/.test(String(p.newPin || ""))) return { ok: false, error: "PIN must be 4 digits" };
  var sh = users_(), r = findRow_(sh, key_(p.name));
  if (r < 0) return { ok: false, error: "User not found" };
  sh.getRange(r, 3).setValue(hash_(p.newPin));
  return { ok: true };
}
