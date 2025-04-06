"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodayEarlyTimeDate = getTodayEarlyTimeDate;
exports.validateAndReturnDate = validateAndReturnDate;
exports.getSundayAndSaturdayDate = getSundayAndSaturdayDate;
const customException_1 = require("./customException");
function getTodayEarlyTimeDate() {
    const now = new Date();
    const midnightUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0));
    return midnightUTC;
}
function validateAndReturnDate(date) {
    if (!(/^\d{4}-\d{2}-\d{2}$/.test(date))) {
        throw new customException_1.CustomException(400, "parameter date is in wrong format");
    }
    const dateInFormat = new Date(date);
    dateInFormat.setUTCHours(0, 0, 0, 0);
    return dateInFormat;
}
function getSundayAndSaturdayDate(plus, mines) {
    const today = getTodayEarlyTimeDate();
    const gapToSundayInThisWeek = today.getUTCDay();
    today.setUTCDate(today.getUTCDate() - gapToSundayInThisWeek);
    const sundayDate = new Date(today);
    if (plus < 0 || mines < 0) {
        throw new customException_1.CustomException(400, "parameter plus and mines can only contain possitive number.");
    }
    sundayDate.setUTCDate(sundayDate.getUTCDate() + ((plus - mines) * 7));
    const saturdayDate = new Date(sundayDate);
    saturdayDate.setUTCDate(saturdayDate.getUTCDate() + 6);
    return { sundayDate, saturdayDate };
}
//# sourceMappingURL=helper.js.map