import * as z from 'zod'

const jobDataSchema = z.object({
  technology: z.array(z.string()),
  location: z.string(),
  experience: z.enum(['internship', 'junior', 'mid', 'senior', 'lead', 'freelance'])
})

const jobContentSchema = z.object({
  description: z.string(),
  responsibilities: z.string(),
  requirements: z.string(),
  about: z.string()
})

export const jobSchema = z.object({
  title: z
    .string({
      error: 'Title is mandatory'
    })
    .min(3, 'Title must be at least 3 characters long')
    .max(100, 'Title can not be longer than 100 characters'),

  company: z.string(),
  location: z.string(),
  description: z.string().optional(),
  data: jobDataSchema,
  content: jobContentSchema
})

export function validateJob(input) {
  return jobSchema.safeParse(input)
}

export function validatePartialJob(input) {
  return jobSchema.partial().safeParse(input)
}
