# Сайт на Next.js для системы виртуальных ассистентов
[![ru](https://img.shields.io/badge/lang-ru-blue.svg)](https://github.com/dogee4803/siteva_next.js/blob/main/README.md)
[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/dogee4803/siteva_next.js/blob/main/README.en.md)
## Запуск проекта

Запуск сервера разработки:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Сайт запускатеся по данному адресу:http://localhost:3000

Стартовая страница `app/page.tsx`. Остальные в папке `app/pages/<путь к нужной странице>/page.tsx`.

## Документация

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Get started with Prisma](https://www.prisma.io/docs/getting-started) - документация на ORM Prisma для работы с БД
- [NextAuth.js](https://next-auth.js.org/) - документация для NextAuth.js. Планируется реализация входа через Яндекс, Гугл, Гитхаб через него. Также сделать для Сбера через кастом.
- [MUI: The React components](https://mui.com) - библиотека компонентов для React.

## Подключение к существующей БД на PostgreSQL

Более подробно здесь: https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgresql

1) cd <ДИРЕКТОРИЯ_ПРОЕКТА>
2) Установка ORM (По идее уже установлена в проекте по умолчанию)
   ```
   npm install prisma --save-dev 
   ```
3) Создание файла .env для хранения переменных окружения (в данном случае адреса БД) и создание папки prisma с файлом schema.prisma в ней.
   ```
   npx prisma init
   ```
4) В файле .env подставить в переменную нужное значение DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public".
5) Создание моделей в shema.prisma
   ```
   npx prisma db pull
   ```
6) Создание первой миграции
   ```
   mkdir -p prisma/migrations/0_init
   npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql
   npx prisma migrate resolve --applied 0_init
   ```
7) Установка клиента Prisma
   По идее нужно только сгенерировать клиента т.к. призма установлена в проекте по умолчанию.
   ```
   npm install @prisma/client
   npx prisma generate
   ```
8) Вроде всё.



