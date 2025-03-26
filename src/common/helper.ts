import { CustomException } from "./customException";


export function getTodayEarlyTimeDate(){
    const now = new Date();
    const midnightUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0));

    return midnightUTC;
}

export function validateAndReturnDate(date: string): Date{

    if (!(/^\d{4}-\d{2}-\d{2}$/.test(date))) {
        throw new CustomException(400, "parameter date is in wrong format")
    }

    const dateInFormat = new Date(date);
    dateInFormat.setUTCHours(0,0,0,0);

    return dateInFormat;
}

export function getSundayAndSaturdayDate(plus: number, mines: number) {
    const today = getTodayEarlyTimeDate();
    const gapToSundayInThisWeek = today.getUTCDay();
    today.setUTCDate(today.getUTCDate() - gapToSundayInThisWeek) //now it became sunday in this week
    const sundayDate = new Date(today);

    if (plus<0 || mines<0) {
        throw new CustomException(400, "parameter plus and mines can only contain possitive number.");
    }

    sundayDate.setUTCDate(sundayDate.getUTCDate() + ((plus - mines)*7)) // add and subtract with parameter
    const saturdayDate = new Date(sundayDate);
    saturdayDate.setUTCDate(saturdayDate.getUTCDate() + 6);
    
    return {sundayDate, saturdayDate};
}