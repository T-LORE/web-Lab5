type Task = {
    name: string;
    description: string;
  };
  
type LessonWithTasks = {
    name: string;
    description: string;
    secondCards: Task[];
  };


  /**
 * @type {LessonWithTasks[]}
 */
const defaultLessons = [
    {
      name: "Математика",
      description: "Урок по математике",
      secondCards: [
        {
          name: "Сделать номер 1",
          description: "Выполнить задание №1 из учебника",
        },
        {
          name: "Подготовиться к контрольной",
          description: "Повторить пройденный материал и подготовиться к контрольной работе",
        },
        {
          name: "Подготовить реферат",
          description: "Написать реферат на тему \"История математики\"",
        },
      ],
    },
    {
      name: "Русский язык",
      description: "Урок по русскому языку",
      secondCards: [
        {
          name: "Выучить правило",
          description: "Выучить правило написания безударных гласных",
        },
        {
          name: "Сделать упражнение 10",
          description: "Выполнить упражнение 10 из учебника",
        },
      ],
    },
    {
      name: "Английский язык",
      description: "Урок по английскому языку",
      secondCards: [
        {
          name: "Выучить новые слова",
          description: "Выучить 10 новых слов по теме \"Еда\"",
        },
        {
          name: "Прочитать текст",
          description: "Прочитать и перевести текст на странице 50",
        },
      ],
    },
  ];
  
  module.exports = defaultLessons;