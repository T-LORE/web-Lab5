import 'dotenv/config'
import express from 'express'
import 'express-async-errors'
import cookieParser from 'cookie-parser'
import usersRouter from './features/users/usersRouter'
import errorHandler from './lib/errorHandler'
import taskRouter from './features/todos/tasksRouter'
import lessonRouter from './features/lessons/lessonRouter'
import cors from 'cors'  // Импортируем cors

export const app = express()

// Настроим CORS
app.use(
  cors({
    origin: 'https://tlore-web.duckdns.org', // Явно указываем разрешенный источник
    credentials: true,
  })
);

app.use(cookieParser())
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/tasks', taskRouter)
app.use('/api/lessons', lessonRouter)

app.use(errorHandler)