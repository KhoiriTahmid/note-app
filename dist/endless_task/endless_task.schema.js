"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateComplitedDatesSchema = exports.UpdateEndlessTaskSchema = exports.CreateEndlessTaskSchema = void 0;
const zod_1 = require("zod");
exports.CreateEndlessTaskSchema = zod_1.z.object({
    text: zod_1.z.string().max(200).default(""),
    startTime: zod_1.z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/),
    endTime: zod_1.z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/),
    startDate: zod_1.z.string()
        .refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" })
        .transform((date) => {
        const parsedDate = new Date(date);
        parsedDate.setUTCHours(0, 0, 0, 0);
        return parsedDate;
    })
        .refine((date) => date >= new Date("2025-01-01"), { message: "Date must be after 2025-01-01" })
        .refine((date) => date <= new Date("2100-12-31"), { message: "Date must be before 2100-12-31" }),
    repeatType: zod_1.z.enum(["daily", "weekly", "monthly", "yearly"])
});
exports.UpdateEndlessTaskSchema = zod_1.z.object({
    text: zod_1.z.string().max(200).optional(),
    startTime: zod_1.z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/).optional(),
    endTime: zod_1.z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/).optional(),
    startDate: zod_1.z.string()
        .refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" })
        .transform((date) => new Date(date))
        .refine((date) => date >= new Date("2025-01-01"), { message: "Date must be after 2025-01-01" })
        .refine((date) => date <= new Date("2100-12-31"), { message: "Date must be before 2100-12-31" }).optional(),
    repeatType: zod_1.z.enum(["daily", "weekly", "monthly", "yearly"]).optional()
});
exports.UpdateComplitedDatesSchema = zod_1.z.object({
    taskId: zod_1.z.string().uuid(),
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
//# sourceMappingURL=endless_task.schema.js.map