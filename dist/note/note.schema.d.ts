import { z } from "zod";
export declare const CreateNoteSchema: z.ZodObject<{
    date: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, Date, string>, Date, string>, Date, string>;
    label: z.ZodOptional<z.ZodString>;
    text: z.ZodDefault<z.ZodString>;
    files: z.ZodEffects<z.ZodDefault<z.ZodArray<z.ZodString, "many">>, string[], string[] | undefined>;
}, "strip", z.ZodTypeAny, {
    date: Date;
    text: string;
    files: string[];
    label?: string | undefined;
}, {
    date: string;
    label?: string | undefined;
    text?: string | undefined;
    files?: string[] | undefined;
}>;
export type CreateNoteDTO = z.infer<typeof CreateNoteSchema>;
export declare const UpdateNoteSchema: z.ZodObject<{
    label: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodString>;
    files: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    label?: string | undefined;
    text?: string | undefined;
    files?: string[] | undefined;
}, {
    label?: string | undefined;
    text?: string | undefined;
    files?: string[] | undefined;
}>;
export type UpdateNoteDTO = z.infer<typeof UpdateNoteSchema>;
