"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStatusTaskSchema = exports.UpdateTaskSchema = exports.CreateTaskSchema = void 0;
const zod_1 = require("zod");
exports.CreateTaskSchema = zod_1.z.object({
    text: zod_1.z.string().trim().min(1).max(200),
    startTime: zod_1.z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/),
    endTime: zod_1.z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/),
    done: zod_1.z.boolean().default(false),
    noteId: zod_1.z.string().uuid()
});
exports.UpdateTaskSchema = zod_1.z.object({
    text: zod_1.z.string().trim().min(1).max(200).optional(),
    startTime: zod_1.z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/).optional(),
    endTime: zod_1.z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/).optional(),
    done: zod_1.z.boolean().optional(),
});
exports.UpdateStatusTaskSchema = zod_1.z.object({
    done: zod_1.z.boolean()
});
//# sourceMappingURL=task.schema.js.map