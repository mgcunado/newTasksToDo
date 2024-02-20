# Tasks to do app's backend made on NestJs with Mysql

## Description

TasksToDO is a lightweight [Nest](https://github.com/nestjs/nest) API, written in typescript, that uses TypeORM to control all MySQL CRUD to all database-level Entities.

- his frontend side made in react with typescript is at:
`../frontendTasksToDoReactTs`

- video suport for this project is located at:
[https://www.youtube.com/watch?v=W4_oH3anYHU](https://www.youtube.com/watch?v=W4_oH3anYHU)

## Installation

```bash
yarn
```

## Running the app

```bash
# development
yarn start

# watch mode
yarn start:dev

# production mode
yarn start:prod
```


```bash
## Test

# unit tests
yarn test

# e2e tests
yarn test:e2e

# test coverage
yarn test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## CLI TypeORM

```bash
# run all migrations
yarn migration:run

# create new migration
yarn migration:create ./src/database/migrations/name-migration

# revert last migration created
yarn migration:revert

# shows all migrations
yarn migration:show

# generate migrations to .sql
yarn migration:generate ./import.sql

# create new subscriber
yarn subscriber:create ./src/database/subscribers/name-subscriber
```
