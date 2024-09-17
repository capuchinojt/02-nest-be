# PROJECT INIT
## Common
 - Sử dụng npm-check-updates để check version libraries
 ```bat
 $ npm install -g npm-check-updates
 ```
### NOTE:
 - Chú ý: Trước khi setup project nên sử dụng ncu để check version các libraries mới nhất và nail version lại thay vì sử dụng "^", là lấy version động mới nhất từ npm

 1. Frontend:
    - Nextjs
    - Typescript

 2. Backend:
    - Nestjs
    - Typescript
    - MongoDB

# INIT PROJECT
## FRONT END
1. Nail version package (Check version nodejs và các thư viện)
 Nail các version package trong package.json để tránh lỗi

2. Khi sử dụng các UI library - cấu hình tránh flickering UI

## BACKEND

1. Cài đặt CLI 

```bat
$ npm i --save-exact -g @nestjs/cli@10.4.5
$ nest new project-name
```