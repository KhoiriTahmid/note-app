import { z } from "zod";
export declare const CreateTaskSchema: z.ZodObject<{
    text: z.ZodString;
    startTime: z.ZodString;
    endTime: z.ZodString;
    done: z.ZodDefault<z.ZodBoolean>;
    noteId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    text: string;
    startTime: string;
    endTime: string;
    done: boolean;
    noteId: string;
}, {
    text: string;
    startTime: string;
    endTime: string;
    noteId: string;
    done?: boolean | undefined;
}>;
export type CreateTaskDTO = z.infer<typeof CreateTaskSchema>;
export declare const UpdateTaskSchema: z.ZodObject<{
    text: z.ZodOptional<z.ZodString>;
    startTime: z.ZodOptional<z.ZodString>;
    endTime: z.ZodOptional<z.ZodString>;
    done: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    text?: string | undefined;
    startTime?: string | undefined;
    endTime?: string | undefined;
    done?: boolean | undefined;
}, {
    text?: string | undefined;
    startTime?: string | undefined;
    endTime?: string | undefined;
    done?: boolean | undefined;
}>;
export type UpdateTaskDTO = z.infer<typeof UpdateTaskSchema>;
export declare const UpdateStatusTaskSchema: z.ZodObject<{
    done: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    done: boolean;
}, {
    done: boolean;
}>;
export type UpdateStatusTaskDTO = z.infer<typeof UpdateStatusTaskSchema>;
