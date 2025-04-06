"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNoteSchema = exports.CreateNoteSchema = void 0;
const zod_1 = require("zod");
exports.CreateNoteSchema = zod_1.z.object({
    date: zod_1.z.string()
        .refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" })
        .transform((date) => {
        const parsedDate = new Date(date);
        parsedDate.setUTCHours(0, 0, 0, 0);
        return parsedDate;
    })
        .refine((date) => date >= new Date("2025-01-01"), { message: "Date must be after 2025-01-01" })
        .refine((date) => date <= new Date("2100-12-31"), { message: "Date must be before 2100-12-31" }),
    label: zod_1.z.string().trim().min(1).max(50).optional(),
    text: zod_1.z.string().default(""),
    files: zod_1.z.array(zod_1.z.string().trim().url())
        .default([])
        .refine((files) => files.every(file => file.trim() !== ""), {
        message: "Files cannot contain empty URLs",
    }),
});
exports.UpdateNoteSchema = zod_1.z.object({
    label: zod_1.z.string().trim().min(1).max(50).optional(),
    text: zod_1.z.string().optional(),
    files: zod_1.z.array(zod_1.z.string().trim().url()).optional(),
});
//# sourceMappingURL=note.schema.js.map