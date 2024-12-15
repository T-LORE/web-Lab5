import { z } from 'zod'

export const todoCreateSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().min(2).max(100),
  completed: z.boolean().optional(),
})
