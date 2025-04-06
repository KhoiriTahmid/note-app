import { z } from "zod";
export declare const CreateEndlessTaskSchema: z.ZodObject<{
    text: z.ZodDefault<z.ZodString>;
    startTime: z.ZodString;
    endTime: z.ZodString;
    startDate: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, Date, string>, Date, string>, Date, string>;
    repeatType: z.ZodEnum<["daily", "weekly", "monthly", "yearly"]>;
}, "strip", z.ZodTypeAny, {
    text: string;
    startTime: string;
    endTime: string;
    startDate: Date;
    repeatType: "daily" | "weekly" | "monthly" | "yearly";
}, {
    startTime: string;
    endTime: string;
    startDate: string;
    repeatType: "daily" | "weekly" | "monthly" | "yearly";
    text?: string | undefined;
}>;
export type CreateEndlessTaskDTO = z.infer<typeof CreateEndlessTaskSchema>;
export declare const UpdateEndlessTaskSchema: z.ZodObject<{
    text: z.ZodOptional<z.ZodString>;
    startTime: z.ZodOptional<z.ZodString>;
    endTime: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, Date, string>, Date, string>, Date, string>>;
    repeatType: z.ZodOptional<z.ZodEnum<["daily", "weekly", "monthly", "yearly"]>>;
}, "strip", z.ZodTypeAny, {
    text?: string | undefined;
    startTime?: string | undefined;
    endTime?: string | undefined;
    startDate?: Date | undefined;
    repeatType?: "daily" | "weekly" | "monthly" | "yearly" | undefined;
}, {
    text?: string | undefined;
    startTime?: string | undefined;
    endTime?: string | undefined;
    startDate?: string | undefined;
    repeatType?: "daily" | "weekly" | "monthly" | "yearly" | undefined;
}>;
export type UpdateEndlessTaskDTO = z.infer<typeof UpdateEndlessTaskSchema>;
export declare const UpdateComplitedDatesSchema: z.ZodObject<{
    taskId: z.ZodString;
    date: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, Date, string>, Date, string>, Date, string>;
}, "strip", z.ZodTypeAny, {
    date: Date;
    taskId: string;
}, {
    date: string;
    taskId: string;
}>;
export type UpdateComplitedDatesDTO = z.infer<typeof UpdateComplitedDatesSchema>;
