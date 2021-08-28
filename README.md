
# ARJS NESTJS API

## Description

ARJS NestJs API is developed on [NestJs](https://github.com/nestjs/nest) framework TypeScript starter repository and [NestJs Puppeteer](https://www.npmjs.com/package/nest-puppeteer) Module

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Run API in Playground

Run playground [http://localhost:8007/graphql](http://localhost:8007/graphql)

```bash
# test query
query {
  testQuery
}

# export pdf report 
mutation {
  generateReport {
    Report_Path
    Report_Generated
  }
}
```
