# PROJECT INIT

## Common

```bash
# Cài đặt nest@cli để sử dụng lệnh command
$ npm install -g @nestjs/cli

# Các lệnh cmd với nest
$ nest --help
## Get help on an individual command using the following construct. Substitute any command, like new, add, etc., where you see generate in the example below to get detailed help on that command:
$ nest generate --help
## Creating an authentication module#
## We'll start by generating an AuthModule and in it, an AuthService and an AuthController. We'll use the AuthService to implement the authentication logic, and the AuthController to expose the authentication endpoints.
### Generate module, controller, service
$ nest g resource auth 
$ nest g module auth
$ nest g controller auth
$ nest g service auth

# Sử dụng npm-check-updates để check version libraries
$ npm install -g npm-check-updates

# Cài đặt bcrypt để hash password
$ npm i bcrypt
$ npm i --save-dev @types/bcrypt 

# Cài đặt jwt để generate json web token cho việc xác thực
$ npm i --save-exact @nestjs/jwt@10.2.0

# Cài đặt aqp (api query params) để query mongodb
$ npm i --save-exact api-query-params@5.4.0

# Format code với prettier
## Check các file vi phạm rule format code
$ prettier . --check 
## Ghi đè nội dung format code với prettier
$ prettier . --write

# Sử dụng class-transformer để convert config thành các class
# cũng có thêm reflect-metadata và class-validator
$ npm install class-transformer class-validator reflect-metadata --save
```

- Dùng [ERD editor extension](https://erd-editor.io/) để thiết kế erd

### MONGODB

```bash
# Cài đặt mongodb qua docker:
$ docker pull mongodb/mongodb-community-server:latest

# Start mongodb docker container với PORT là 27017:
$ docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest

# List docker container:
$ docker container ls

# List docker đang chạy:
$ docker ps -a

# Run mongodb docker với PORT LÀ 27017 với mongodbsh
$ mongosh --port 27017

# Setup mongodb with nestjs
$ npm i @nestjs/mongoose mongoose

# Using nest to gemerate default source
$ nest g resource [FolderName]
```

<strong>Link tham khảo: </strong>

<ul>
   <li><a href="https://www.mongodb.com/docs/manual/tutorial/install-mongodb-community-with-docker/">Install MongoDB community with Docker</a></li>
   <hr/>
   <li>
      <a href="https://www.mongodb.com/docs/mongodb-shell/">MongoDB shell</a>
   </li>
   <hr/>
   <li>
      <a href="https://docs.nestjs.com/techniques/mongodb">Setup Nestjs with MongoDB</a>
   </li>
   <hr/>
   <li>
      <a href="https://docs.nestjs.com/recipes/crud-generator">Crud Generator</a>
   </li>
</ul>

### NOTE:

- Chú ý: Trước khi setup project nên sử dụng ncu để check version các libraries mới nhất và nail version lại thay vì sử dụng "^", là lấy version động mới nhất từ npm

1.  Frontend:

    - Nextjs
    - Typescript

2.  Backend:
    - Nestjs
    - Typescript
    - MongoDB

## INIT PROJECT

## FRONT END

1. Nail version package (Check version nodejs và các thư viện)
   Nail các version package trong package.json để tránh lỗi

2. Khi sử dụng các UI library - cấu hình tránh flickering UI

## BACKEND

1. Cài đặt Nestjs CLI

```bash
$ npm i --save-exact -g @nestjs/cli@10.4.5
$ nest new project-name
```

[Nestjs with mongoDB](https://docs.nestjs.com/techniques/mongodb)

2. Cài đặt mongoose để kết nối đến MongoDB

```bash
$ npm i --save-exact @nestjs/mongoose@10.0.10 mongoose@8.6.3
```

[Nestjs with mongoDB](https://docs.nestjs.com/techniques/mongodb)

3. Cài đặt nestjs config -> Get config từ env

```bash
$ npm i --save-exact @nestjs/config@3.2.3
```

[Nestjs config](https://docs.nestjs.com/techniques/configuration)

4. Sử dụng Passport (auth) để build phần guard chu ứng dụng

```bash
$ npm install --save-exact @nestjs/passport@10.0.3 passport@0.7.0 passport-local@1.0.0
$ npm install --save-dev @types/passport-local
```
[Passpord (auth)](https://docs.nestjs.com/recipes/passport)

5. Sử dụng @nest/jwt và passport-jwt để thao tác với jwt

```bash
$ npm install --save-exact @nestjs/jwt@10.2.0 passport@0.7.0 passport-jwt@4.0.1
$ npm install --save-dev @types/passport-jwt
```
6. Sử dụng dayjs để format ngày, giờ
   Sử dụng uuid để generate id

```bash
$ npm install --save-exact dayjs@1.11.13 uuid@10.0.0
$ npm install --save-dev @types/uuid
```


