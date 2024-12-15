# Используем официальный образ Node.js
FROM node:18-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json (или yarn.lock) в контейнер
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все остальные файлы проекта
COPY . .

# Строим приложение для продакшн
RUN npm run build

# Открываем порт для приложения
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]