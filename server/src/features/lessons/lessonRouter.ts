import { Router } from 'express'
import db from '@/db'
import { querySchema } from '@/lib/genericValidators'
import { verifyToken } from '@/auth'
import { todoCreateSchema } from './lessonValidator'

const lessonRouter = Router()

lessonRouter.get('/', verifyToken, async (req, res) => {
  const userId = req.body.user?.id

  const { limit, offset } = await querySchema.parseAsync(req.query)

  const lessons = await db.lesson.findMany({
    take: limit,
    skip: offset,
    where: {
      userId,
    },
    include: {
        secondCards: true,
    },
  })

  res.json(lessons)

})

lessonRouter.post('/', verifyToken, async (req, res) => {
  const userId = req.body.user?.id

  const {name, description } = await todoCreateSchema.parseAsync(req.body)

  const lesson = await db.lesson.create({
    data: {
      name,
      description,
      userId,
    },
  })

  res.json(lesson)
})

export default lessonRouter