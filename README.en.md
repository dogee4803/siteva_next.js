# The site is based on Next.js for the virtual assistant system
[![ru](https://img.shields.io/badge/lang-ru-blue.svg)](https://github.com/dogee4803/siteva_next.js/blob/main/README.md)
[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/dogee4803/siteva_next.js/blob/main/README.en.md)
## Project Launch

Starting the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The site is launched at this address:http://localhost:3000

Home page: `app/page.tsx`. Others: `app/pages/<путь к нужной странице>/page.tsx`.

## Docs

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Get started with Prisma](https://www.prisma.io/docs/getting-started) - ORM Prisma documentation for working with databases
- [NextAuth.js](https://next-auth.js.org/) - NextAuth.js Docs.
- [MUI: The React components](https://mui.com) - the component library for React.

## Connection to existing PostgreSQL DB

More details here: https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgresql

1) cd <ДИРЕКТОРИЯ_ПРОЕКТА>
2) Installing ORM. (Installed already by default in project)
   ```
   npm install prisma --save-dev 
   ```
3) Create an .env file to store environment variables (in this case, database addresses) and create a prisma folder with the schema.prisma file in it.
   ```
   npx prisma init
   ```
4) In the file .env insert the desired DATABASE_URL value into the variable="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public ".
5) Generating models in shema.prisma from DB
   ```
   npx prisma db pull
   ```
6) Creating init migration
   ```
   mkdir -p prisma/migrations/0_init
   npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql
   npx prisma migrate resolve --applied 0_init
   ```
7) Installing the Prisma client
   In theory, you only need to generate a client because the prism is installed in the project by default.
   ```
   npm install @prisma/client
   npx prisma generate
   ```



