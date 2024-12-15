import { Router } from 'express'
import db from '@/db'
import { querySchema } from '@/lib/genericValidators'
import { verifyToken } from '@/auth'
import { todoCreateSchema } from './lessonValidator'

const lessonRouter = Router()

lessonRouter.get('/', verifyToken, async (req, res) => {
  const userId = req.body.user?.id

  const { limit, offset } = await querySchema.parseAsync(req.query)
  console.log(req.cookies);
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

lessonRouter.delete('/:lessonId', verifyToken, async (req, res) => {
  const userId = req.body.user?.id;
  const { lessonId } = req.params;

  const lesson = await db.lesson.findUnique({
    where: { id: lessonId },
    include: {
      secondCards: true,
    },
  });

  if (!lesson) {
    return res.status(404).json({ message: 'Lesson not found' });
  }

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (lesson.userId !== userId && user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'You do not have permission to delete this lesson' });
  }

  if (lesson.secondCards.length > 0) {
    await db.task.deleteMany({
      where: { lessonId: lessonId },
    });
  }

  await db.lesson.delete({
    where: { id: lessonId },
  });

  res.status(200).json({ message: 'Lesson and associated tasks deleted successfully' });
});

lessonRouter.put('/:lessonId', verifyToken, async (req, res) => {
  const userId = req.body.user?.id; 
  const { lessonId } = req.params; 
  const { name, description } = await todoCreateSchema.parseAsync(req.body)

  const lesson = await db.lesson.findUnique({
    where: { id: lessonId },
    include: {
      secondCards: true, 
    },
  });

  if (!lesson) {
    return res.status(404).json({ message: 'Lesson not found' });
  }

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (lesson.userId !== userId && user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'You do not have permission to edit this lesson' });
  }

  const updatedLesson = await db.lesson.update({
    where: { id: lessonId },
    data: {
      name: name || lesson.name, 
      description: description || lesson.description,
    },
  });

  res.status(200).json(updatedLesson);
});



export default lessonRouter