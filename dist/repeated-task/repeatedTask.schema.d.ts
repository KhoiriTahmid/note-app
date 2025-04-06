import { z } from "zod";
export declare const createRepeatedTaskSchema: z.ZodObject<{
    dates: z.ZodArray<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, Date, string>, Date, string>, Date, string>, "many">;
    text: z.ZodString;
    startTime: z.ZodString;
    endTime: z.ZodString;
}, "strip", z.ZodTypeAny, {
    text: string;
    dates: Date[];
    startTime: string;
    endTime: string;
}, {
    text: string;
    dates: string[];
    startTime: string;
    endTime: string;
}>;
export type createRepeatedTaskDTO = z.infer<typeof createRepeatedTaskSchema>;
export declare const updateRepeatedTaskById: z.ZodObject<{
    text: z.ZodOptional<z.ZodString>;
    startTime: z.ZodOptional<z.ZodString>;
    endTime: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    text?: string | undefined;
    startTime?: string | undefined;
    endTime?: string | undefined;
}, {
    text?: string | undefined;
    startTime?: string | undefined;
    endTime?: string | undefined;
}>;
export type updateRepeatedTaskByIdDTO = z.infer<typeof updateRepeatedTaskById>;
export declare const updateStatusOrRemoveRepeatedTask: z.ZodObject<{
    repeatedTaskId: z.ZodString;
    date: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, Date, string>, Date, string>, Date, string>;
}, "strip", z.ZodTypeAny, {
    date: Date;
    repeatedTaskId: string;
}, {
    date: string;
    repeatedTaskId: string;
}>;
export type updateStatusOrRemoveRepeatedTaskDTO = z.infer<typeof updateStatusOrRemoveRepeatedTask>;
export declare const removeRepeatedTask: z.ZodString;
export type removeRepeatedTaskDTO = z.infer<typeof removeRepeatedTask>;
