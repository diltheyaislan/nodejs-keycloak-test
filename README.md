# Node Express Starter

Node.JS with Express API for a new back-end project with basic functionality already implemented, such as user resources, authentication with JWT and others.

## Getting started

Configure the **.env** and **ormconfig.json** files based on **.env.example** and **ormconfig.example.json**

## Using HTTPS

Set property APP_ENV with "production" value for start server using HTTPS

## TypeORM with Seeder

Run `yarn seed:create MySeeder` to create a new seeder file in *.\src\shared\infra\typeorm\seeds*

Run `yarn seed:run` to execute all seeder

## ACL Middleware

Use *.\src\modules\permissions\infra\http\middlewares\hasPermission* on routes to restrict access

## Build

Run `yarn build`

Copy *tmp* and *uploads* folders and *.env* and *ormconfig.json* files to application directory

## Start application

Run `node .\app\shared\infra\http\server.js`
