# Task API - Node.js Express

REST API sederhana untuk manajemen task dengan autentikasi JWT.
Project ini dibuat sebagai portfolio backend menggunakan Node.js, Express, MySQL, dan JSON Web Token.

## Tech Stack

* Node.js
* Express.js
* MySQL
* JWT Authentication
* bcryptjs
* Postman

## Features

* User Registration
* User Login (JWT Authentication)
* Create Task
* Get All Tasks
* Get Task by ID
* GET /tasks?page=1&limit=10 (pagination)
* GET /tasks?status=pending (search by status)
* GET /tasks?search=node (search)
* GET /tasks?page=1&limit=10&status=completed (limit page 10)
* Update Task
* Delete Task

## Project Structure

```
task-api
│
├── controllers
│   └── tasksController.js
│
├── middleware
│   └── auth.js
│
├── models
│   └── taskModel.js
│
├── routes
│   └── tasks.js
│
├── app.js
├── db.js
├── package.json
└── task-api.postman_collection.json
```

## Installation

Clone repository

```
git clone https://github.com/syahririzky15/task-api-nodejs.git
```

Masuk ke folder project

```
cd task-api-nodejs
```

Install dependencies

```
npm install
```

Jalankan server

```
node app.js
```

Server akan berjalan di:

```
http://localhost:3000
```

## API Endpoints

### Register User

POST /register

Body:

```
{
"name": "John",
"email": "john@example.com",
"password": "123456"
}
```

---

### Login

POST /login

Body:

```
{
"email": "john@example.com",
"password": "123456"
}
```

Response:

```
{
"token": "JWT_TOKEN"
}
```

---

### Get All Tasks

GET /tasks
GET /tasks?page=1&limit=10
GET /tasks?status=pending
GET /tasks?search=node
GET /tasks?page=1&limit=10&status=completed

Header:

```
Authorization: Bearer TOKEN
```

---

### Create Task

POST /tasks

Header:

```
Authorization: Bearer TOKEN
```

Body:

```
{
"title": "Belajar Node.js",
"description": "Membuat REST API"
}
```

---

### Update Task

PUT /tasks/:id

---

### Delete Task

DELETE /tasks/:id

---

## API Testing

API dapat diuji menggunakan Postman dengan file collection yang tersedia di repository:

```
task-api.postman_collection.json
```

## Author

Syahri Rizki Ramadhan Harahap
Informatics Graduate
