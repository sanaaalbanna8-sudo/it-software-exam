/**
 * ربط امتحان OS & UI بجدول العلامات
 * --------------------------------
 * 1) افتح الجدول:
 *    https://docs.google.com/spreadsheets/d/1sFHAFPiDIcCnExXIxhQb9PxsyKtSFYr5Zyy58BkBwww/edit
 * 2) Extensions → Apps Script
 * 3) الصق هذا الملف كاملًا واحفظه
 * 4) Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5) انسخي رابط الـ Web app والصقيه في js/exam.js داخل SHEETS_ENDPOINT
 */

var SHEET_ID = "1sFHAFPiDIcCnExXIxhQb9PxsyKtSFYr5Zyy58BkBwww";
var SHEET_NAME = "Sheet1";

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, message: "exam sheets bridge ready" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
    ensureHeaders_(sheet);

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || "",
      Number(data.score) || 0,
      Number(data.total) || 0,
      Number(data.percent) || 0,
      data.part1 || "",
      data.part2 || "",
      data.osTypes || "",
      data.osRole || "",
      data.ui || "",
      data.uiClassify || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() > 0) return;
  sheet.appendRow([
    "التاريخ",
    "اسم الطالب",
    "الدرجة",
    "من",
    "النسبة %",
    "الجزء 1",
    "الجزء 2",
    "أنظمة التشغيل",
    "مهام النظام",
    "الواجهات",
    "سحب وإفلات"
  ]);
  sheet.setFrozenRows(1);
}
