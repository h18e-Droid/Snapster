#Устанавливаем зависимости
FROM node:20.11-alpine as dependencies
WORKDIR /src/app
COPY package*.json ./
RUN npm install

#Билдим приложение
#Кэширование зависимостей — если файлы в проекте изменились,
#но package.json остался неизменным, то стейдж с установкой зависимостей повторно не выполняется, что экономит время.
FROM node:20.11-alpine as builder
WORKDIR /src/app
COPY . .
COPY --from=dependencies /src/app/node_modules ./node_modules
RUN npm run build:production

#Стейдж запуска
FROM node:20.11-alpine as runner
WORKDIR /src/app
ENV NODE_ENV production
COPY --from=builder /src/app/ ./
EXPOSE 3000
CMD ["npm", "start"]
