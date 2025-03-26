import { z } from "zod";

export const CreateEndlessTaskSchema = z.object({
  text : z.string().max(200).default(""),
  startTime : z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/),
  endTime : z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/),
  startDate : z.string()
    .refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }) 
    .transform((date) => {
      const parsedDate = new Date(date);
      parsedDate.setUTCHours(0, 0, 0, 0);
      return parsedDate;
    }) 
    .refine((date) => date >= new Date("2025-01-01"), { message: "Date must be after 2025-01-01" }) 
    .refine((date) => date <= new Date("2100-12-31"), { message: "Date must be before 2100-12-31" }),
  repeatType : z.enum(["daily", "weekly", "monthly", "yearly"])
})

export type CreateEndlessTaskDTO = z.infer<typeof CreateEndlessTaskSchema>;

export const UpdateEndlessTaskSchema = z.object({
  text : z.string().max(200).optional(),
  startTime : z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/).optional(),
  endTime : z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/).optional(),
  startDate : z.string()
  .refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }) 
  .transform((date) =>  new Date(date))
  .refine((date) => date >= new Date("2025-01-01"), { message: "Date must be after 2025-01-01" }) 
  .refine((date) => date <= new Date("2100-12-31"), { message: "Date must be before 2100-12-31" }).optional(),
  repeatType : z.enum(["daily", "weekly", "monthly", "yearly"]).optional()
})

export type UpdateEndlessTaskDTO = z.infer<typeof UpdateEndlessTaskSchema>;

export const UpdateComplitedDatesSchema = z.object({
  taskId: z.string().uuid(),
  date : z.string()
    .refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }) 
    .transform((date) => {
      const parsedDate = new Date(date);
      parsedDate.setUTCHours(0, 0, 0, 0);
      return parsedDate;
    }) 
    .refine((date) => date >= new Date("2025-01-01"), { message: "Date must be after 2025-01-01" }) 
    .refine((date) => date <= new Date("2100-12-31"), { message: "Date must be before 2100-12-31" }),
})
export type UpdateComplitedDatesDTO = z.infer<typeof UpdateComplitedDatesSchema>;