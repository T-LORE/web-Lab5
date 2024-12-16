# 1. Используем официальный образ Node.js
FROM node:18 AS build

# 2. Устанавливаем рабочую директорию
WORKDIR /app

# 3. Копируем package.json и package-lock.json (или pnpm-lock.yaml, если используется pnpm)
COPY package*.json ./ 

# 4. Устанавливаем менеджер пакетов pnpm
RUN npm install -g pnpm

# 6. Копируем все файлы, исключая указанные в .dockerignore
COPY . .

# 5. Устанавливаем зависимости
RUN pnpm install

# 7. Компилируем TypeScript в JavaScript
RUN pnpm run build 

# 8. Генерируем Prisma-клиент
RUN npx prisma generate

# 9. Используем второй легковесный слой для продакшн-сборки
FROM node:18

# 10. Устанавливаем рабочую директорию
WORKDIR /app

# 11. Копируем все артефакты сборки из предыдущего слоя
COPY --from=build /app /app

# 12. Указываем порт приложения
EXPOSE 3000

# 13. Запускаем приложение
CMD ["npm", "start"]
