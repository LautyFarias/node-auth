# node-auth

Authentication use case implementing Clean Architecture in Node.js

This project was created following the course: [NodeJS: RestServer con Clean Architecture](https://www.linkedin.com/learning/nodejs-restserver-con-clean-architecture) by [Fernando Herrera](https://www.linkedin.com/learning/instructors/fernando-herrera)

## Run application

1. Copy `.env.template` and paste it as `.env` file:

```bash
cp .env.template .env
```

2. Open it using your prefered editor and complete it:

```bash
vim .env

# file content:
#
# PORT=3000
# MONGO_URL=localhost:27017
# MONGO_DB_NAME=node-auth
```

3. Run dev server:

```bash
npm run dev
```