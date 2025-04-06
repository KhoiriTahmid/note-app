"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountUpdateSchema = exports.AccountLoginSchema = exports.AccountSignupSchema = void 0;
const zod_1 = require("zod");
exports.AccountSignupSchema = zod_1.z.object({
    username: zod_1.z.string().trim()
        .min(1, "Username is required")
        .max(50, "Username must be at most 50 characters"),
    password: zod_1.z.string().trim()
        .min(8, "Password must be at least 8 characters")
        .max(60, "Password must be at most 60 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    email: zod_1.z.string().trim().email("Invalid email format").toLowerCase(),
    role: zod_1.z.enum(["admin", "user"])
});
exports.AccountLoginSchema = zod_1.z.object({
    usernameOrEmail: zod_1.z.string().trim().min(1).max(255),
    password: zod_1.z.string().trim()
        .min(8, "Password must be at least 8 characters")
        .max(60, "Password must be at most 60 characters"),
});
exports.AccountUpdateSchema = zod_1.z.object({
    id: zod_1.z.string().trim().uuid(),
    username: zod_1.z.string().trim()
        .min(1, "Username is required")
        .max(50, "Username must be at most 50 characters")
        .optional(),
    email: zod_1.z.string().trim().email().toLowerCase().optional().transform((el) => el?.toLowerCase()),
});
//# sourceMappingURL=account.schema.js.map