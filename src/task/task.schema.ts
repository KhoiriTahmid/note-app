import { z } from "zod";

export const CreateTaskSchema = z.object({
    text : z.string().trim().min(1).max(200),
    startTime : z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/),
    endTime : z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/),
    done : z.boolean().default(false),
    noteId : z.string().uuid()
})

export type CreateTaskDTO = z.infer<typeof CreateTaskSchema>

export const UpdateTaskSchema = z.object({
    text : z.string().trim().min(1).max(200).optional(),
    startTime : z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/).optional(),
    endTime : z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/).optional(),
    done : z.boolean().optional(),
})

export type UpdateTaskDTO = z.infer<typeof UpdateTaskSchema>

export const UpdateStatusTaskSchema = z.object({
    done : z.boolean()
})

export type UpdateStatusTaskDTO = z.infer<typeof UpdateStatusTaskSchema>