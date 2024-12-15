import { Router } from 'express'
import db from '@/db'
import { querySchema } from '@/lib/genericValidators'
import { verifyToken } from '@/auth'
import { todoCreateSchema } from './tasksValidators'

const taskRouter = Router()

taskRouter.get('/', verifyToken, async (req, res) => {
  const userId = req.body.user?.id
  const { limit, offset } = await querySchema.parseAsync(req.query)
  const todos = await db.task.findMany({
    take: limit,
    skip: offset,
    where: {
      userId,
    },
  })
  res.json(todos)
})

taskRouter.post('/', verifyToken, async (req, res) => {
  const userId = req.body.user?.id
  const {name, description, completed } = await todoCreateSchema.parseAsync(req.body)
  const todo = await db.task.create({
    data: {
      name,
      description,
      completed,
      userId,
    },
  })
  res.json(todo)
})

export default taskRouter
