import { Router } from 'express'
import db from '@/db'
import {
  isAdmin,
  isSelf,
  setToken,
  verifyToken,
  comparePasswordHash,
  createPasswordHash,
} from '@/auth'
import { querySchema, uuidSchema } from '@/lib/genericValidators'
import {
  credentialsSchema,
  userCreateSchema,
  userUpdateSchema,
} from './usersValidators'
import { Prisma } from '@prisma/client'
import createHttpError from 'http-errors'

const usersRouter = Router()

usersRouter.get('/', verifyToken, isAdmin, async (req, res) => {
  const { limit, offset } = await querySchema.parseAsync(req.query)
  const users = await db.user.findMany({
    take: limit,
    skip: offset,
    select: {
      id: true,
      email: true,
      role: true,
      name: true,
    },
  })
  res.json(users)
})

usersRouter.get('/:id', verifyToken, isSelf, async (req, res) => {
  const id = await uuidSchema.parseAsync(req.params.id)
  const user = await db.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      role: true,
      name: true,
    },
  })
  res.json(user)
})

usersRouter.post('/', verifyToken, isAdmin, async (req, res) => {
  const { email, password, role, name } = await userCreateSchema.parseAsync(
    req.body,
  )
  const passHash = await createPasswordHash(password)
  const user = await db.user.create({
    data: {
      email,
      password: passHash,
      role,
      name,
    },
    select: {
      id: true,
      email: true,
      role: true,
      name: true,
    },
  })
  res.json(user)
})

usersRouter.patch('/:id', verifyToken, isSelf, async (req, res) => {
  const id = await uuidSchema.parseAsync(req.params.id)
  const { email, password, role, name } = await userUpdateSchema.parseAsync(
    req.body,
  )
  const updatedData: Prisma.UserUpdateInput = {}
  if (email) updatedData.email = email
  if (password) updatedData.password = await createPasswordHash(password)
  if (role && req.body.user.role === 'ADMIN') {
    updatedData.role = role
  }
  if (name) updatedData.name = name
  const user = await db.user.update({
    where: {
      id,
    },
    data: updatedData,
    select: {
      id: true,
      email: true,
      role: true,
      name: true,
    },
  })
  res.json(user)
})

usersRouter.delete('/:id', verifyToken, isSelf, async (req, res) => {
  const id = await uuidSchema.parseAsync(req.params.id)
  await db.user.delete({
    where: {
      id,
    },
  })
  res.sendStatus(200)
})

usersRouter.post('/login', async (req, res) => {
  const { email, password } = await credentialsSchema.parseAsync(req.body)
  const user = await db.user.findUnique({
    where: {
      email,
    },
  })
  if (!user) {
    throw new createHttpError.Unauthorized()
  }
  const isPasswordValid = await comparePasswordHash(password, user.password)
  if (!isPasswordValid) {
    throw new createHttpError.Unauthorized()
  }
  setToken(res, {
    id: user.id,
    role: user.role,
  })
})

usersRouter.post('/logout', verifyToken, async (req, res) => {
  res.clearCookie('token')
  res.sendStatus(200)
})

const defaultLessons = require('./defaultLessons'); // Путь к файлу defaultLessons

usersRouter.post('/signup', async (req, res) => {
  const { email, password } = await credentialsSchema.parseAsync(req.body);
  const passHash = await createPasswordHash(password);

  try {
    const user = await db.user.create({
      data: {
        email,
        password: passHash,
        role: 'USER',
        todoLists: {
          create: defaultLessons.map((lesson: LessonWithTasks) => ({
            name: lesson.name,
            description: lesson.description,
            secondCards: {
              create: lesson.secondCards.map((task) => ({
                name: task.name,
                description: task.description,
              })),
            },
          })),
        },
      },
      select: {
        id: true,
        email: true,
        role: true, // Добавлено поле role
        todoLists: {
          include: {
            secondCards: true,
          },
        },
      },
    });

    setToken(res, {
      id: user.id,
      role: user.role, // Теперь поле role доступно
    });

  } catch (error) {
    console.error("Ошибка при создании пользователя:", error);
    res.status(500).json({ error: "Не удалось создать пользователя" });
  }
});

export default usersRouter
