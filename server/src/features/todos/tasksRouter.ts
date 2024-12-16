import { Router } from 'express'
import db from '@/db'
import { querySchema } from '@/lib/genericValidators'
import { verifyToken } from '@/auth'
import { todoCreateSchema } from './tasksValidators'
import { Role } from '@prisma/client'

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
    orderBy: {
      name: 'asc',
    },
  });
  
  res.status(200).json(todos)
})

taskRouter.post('/', verifyToken, async (req, res) => {
  const userId = req.body.user?.id;

  const { name, description, completed, lessonId } = await todoCreateSchema.parseAsync(req.body);

  const lesson = await db.lesson.findUnique({
    where: { id: lessonId },
  });

  if (!lesson) {
    return res.status(404).json({ message: 'Lesson not found' });
  }

  const task = await db.task.create({
    data: {
      name,
      description,
      completed,
      userId,
      lessonId, 
    },
  });

  res.status(201).json(task);
});

taskRouter.delete('/:id', verifyToken, async (req, res) => {
  const userId = req.body.user?.id; 
  const taskId = req.params.id; 

  const task = await db.task.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (task.userId !== userId && user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'You do not have permission to delete this task' });
  }

  await db.task.delete({
    where: { id: taskId },
  });

  res.status(200).json({ message: 'Task deleted successfully' });
});

taskRouter.put('/:id', verifyToken, async (req, res) => {
  const userId = req.body.user?.id;
  const taskId = req.params.id;
  const { name, description, completed } = await todoCreateSchema.parseAsync(req.body);

  const task = await db.task.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (task.userId !== userId && user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'You do not have permission to edit this task' });
  }

  const updatedTask = await db.task.update({
    where: { id: taskId },
    data: {
      name: name ?? task.name,
      description: description ?? task.description,
      completed: completed ?? task.completed,
    },
  });

  res.status(200).json(updatedTask);
});

export default taskRouter
