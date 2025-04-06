import { z } from "zod";
export declare const AccountSignupSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    email: z.ZodString;
    role: z.ZodEnum<["admin", "user"]>;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
    email: string;
    role: "admin" | "user";
}, {
    username: string;
    password: string;
    email: string;
    role: "admin" | "user";
}>;
export type AccountSignupDto = z.infer<typeof AccountSignupSchema>;
export declare const AccountLoginSchema: z.ZodObject<{
    usernameOrEmail: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    usernameOrEmail: string;
}, {
    password: string;
    usernameOrEmail: string;
}>;
export type AccountLoginDTO = z.infer<typeof AccountLoginSchema>;
export declare const AccountUpdateSchema: z.ZodObject<{
    id: z.ZodString;
    username: z.ZodOptional<z.ZodString>;
    email: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
}, "strip", z.ZodTypeAny, {
    id: string;
    username?: string | undefined;
    email?: string | undefined;
}, {
    id: string;
    username?: string | undefined;
    email?: string | undefined;
}>;
export type AccountUpdateDTO = z.infer<typeof AccountUpdateSchema>;
