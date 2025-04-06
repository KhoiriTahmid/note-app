"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeRepeatedTask = exports.updateStatusOrRemoveRepeatedTask = exports.updateRepeatedTaskById = exports.createRepeatedTaskSchema = void 0;
const zod_1 = require("zod");
exports.createRepeatedTaskSchema = zod_1.z.object({
    dates: zod_1.z.array(zod_1.z.string()
        .refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" })
        .transform((date) => {
        const parsedDate = new Date(date);
        parsedDate.setUTCHours(0, 0, 0, 0);
        return parsedDate;
    })
        .refine((date) => date >= new Date("2025-01-01"), { message: "Date must be after 2025-01-01" })
        .refine((date) => date <= new Date("2100-12-31"), { message: "Date must be before 2100-12-31" })).min(1),
    text: zod_1.z.string().min(1).max(200),
    startTime: zod_1.z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/),
    endTime: zod_1.z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/),
});
exports.updateRepeatedTaskById = zod_1.z.object({
    text: zod_1.z.string().min(1).max(200).optional(),
    startTime: zod_1.z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/).optional(),
    endTime: zod_1.z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/).optional(),
});
exports.updateStatusOrRemoveRepeatedTask = zod_1.z.object({
    repeatedTaskId: zod_1.z.string().uuid(),
    date: zod_1.z.string()
        .refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" })
        .transform((date) => {
        const parsedDate = new Date(date);
        parsedDate.setUTCHours(0, 0, 0, 0);
        return parsedDate;
    })
        .refine((date) => date >= new Date("2025-01-01"), { message: "Date must be after 2025-01-01" })
        .refine((date) => date <= new Date("2100-12-31"), { message: "Date must be before 2100-12-31" }),
});
exports.removeRepeatedTask = zod_1.z.string().uuid();
//# sourceMappingURL=repeatedTask.schema.js.map