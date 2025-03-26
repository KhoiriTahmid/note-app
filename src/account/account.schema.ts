import {z} from "zod";

export const AccountSignupSchema = z.object({
    username: z.string().trim()
        .min(1, "Username is required")
        .max(50, "Username must be at most 50 characters"),
    password: z.string().trim()
        .min(8, "Password must be at least 8 characters") 
        .max(60, "Password must be at most 60 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    email: z.string().trim().email("Invalid email format").toLowerCase(),
    role: z.enum(["admin","user"])
})
export type AccountSignupDto = z.infer<typeof AccountSignupSchema>;

export const AccountLoginSchema = z.object({
    usernameOrEmail: z.string().trim().min(1).max(255),
    password: z.string().trim()
        .min(8,"Password must be at least 8 characters")
        .max(60,"Password must be at most 60 characters"),
})

export type AccountLoginDTO = z.infer<typeof AccountLoginSchema>

export const AccountUpdateSchema = z.object({
    id: z.string().trim().uuid(),
    username: z.string().trim()
        .min(1, "Username is required")
        .max(50, "Username must be at most 50 characters")
        .optional(),
    email: z.string().trim().email().toLowerCase().optional().transform((el)=>el?.toLowerCase()),
})

export type AccountUpdateDTO = z.infer<typeof AccountUpdateSchema>