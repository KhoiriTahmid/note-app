import { z } from "zod";
export const createRepeatedTaskSchema = z.object({
    dates: z.array(z.string()
        .refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }) 
        .transform((date) => {
            const parsedDate = new Date(date);
            parsedDate.setUTCHours(0, 0, 0, 0);
            return parsedDate;
        }) 
        .refine((date) => date >= new Date("2025-01-01"), { message: "Date must be after 2025-01-01" }) 
        .refine((date) => date <= new Date("2100-12-31"), { message: "Date must be before 2100-12-31" }),
    ).min(1),
    text: z.string().min(1).max(200),
    startTime: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/),
    endTime: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/),
})

export type createRepeatedTaskDTO = z.infer<typeof createRepeatedTaskSchema>

export const updateRepeatedTaskById = z.object({
    text: z.string().min(1).max(200).optional(),
    startTime: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/).optional(),
    endTime: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/).optional(),
})
export type updateRepeatedTaskByIdDTO = z.infer<typeof updateRepeatedTaskById>

export const updateStatusOrRemoveRepeatedTask = z.object({
    repeatedTaskId: z.string().uuid(),
    date: z.string()
    .refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }) 
    .transform((date) => {
        const parsedDate = new Date(date);
        parsedDate.setUTCHours(0, 0, 0, 0);
        return parsedDate;
    }) 
    .refine((date) => date >= new Date("2025-01-01"), { message: "Date must be after 2025-01-01" }) 
    .refine((date) => date <= new Date("2100-12-31"), { message: "Date must be before 2100-12-31" }),
})
export type updateStatusOrRemoveRepeatedTaskDTO = z.infer<typeof updateStatusOrRemoveRepeatedTask>

export const removeRepeatedTask = z.string().uuid()

export type removeRepeatedTaskDTO = z.infer<typeof removeRepeatedTask>