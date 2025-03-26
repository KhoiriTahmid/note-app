import { z } from "zod";

export const CreateNoteSchema = z.object({
  date : z.string()
    .refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }) 
    .transform((date) => {
      const parsedDate = new Date(date);
      parsedDate.setUTCHours(0, 0, 0, 0);
      return parsedDate;
    }) 
    .refine((date) => date >= new Date("2025-01-01"), { message: "Date must be after 2025-01-01" }) 
    .refine((date) => date <= new Date("2100-12-31"), { message: "Date must be before 2100-12-31" }),

  label : z.string().trim().min(1).max(50).optional(),
  text :z.string().default(""),
  files: z.array(z.string().trim().url())
    .default([])
    .refine((files) => files.every(file => file.trim() !== ""), {
      message: "Files cannot contain empty URLs",
    }),
})

export type CreateNoteDTO = z.infer<typeof CreateNoteSchema>

export const UpdateNoteSchema = z.object({
  label : z.string().trim().min(1).max(50).optional(),
  text :z.string().optional(),
  files : z.array(z.string().trim().url()).optional(),
})

export type UpdateNoteDTO = z.infer<typeof UpdateNoteSchema>