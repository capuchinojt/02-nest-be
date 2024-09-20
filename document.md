# PROJECT INIT

## Common

```bash
# Sử dụng npm-check-updates để check version libraries
$ npm install -g npm-check-updates

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
