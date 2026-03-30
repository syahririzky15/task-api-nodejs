# Task API - Node.js Express

REST API untuk manajemen task dengan autentikasi JWT.
Project ini dibuat sebagai portfolio backend dengan fitur pagination, filtering, searching, dan authentication.

---

## 🚀 Tech Stack

* Node.js
* Express.js
* MySQL
* JSON Web Token (JWT)
* bcryptjs

---

## ✨ Features

* User Authentication (Register & Login)
* JWT Authorization
* CRUD Task
* Pagination (page & limit)
* Filtering by status (pending / completed)
* Search by title
* Sorting (asc / desc)

---

## 📁 Project Structure

```
task-api
├── controllers
├── models
├── routes
├── middleware
├── app.js
├── db.js
├── package.json
└── task-api.postman_collection.json
```

---

## ⚙️ Installation

Clone repository:

```
git clone https://github.com/syahririzky15/task-api-nodejs.git
```

Masuk ke folder project:

```
cd task-api-nodejs
```

Install dependencies:

```
npm install
```

Jalankan server:

```
node app.js
```

Server berjalan di:

```
http://localhost:3000
```

---

## 🔑 Authentication

Gunakan JWT token di header:

```
Authorization: Bearer TOKEN
```

---

## 📌 API Endpoints

### 🔹 Register

```
POST /register
```

Body:

```
{
  "name": "John",
  "email": "john@example.com",
  "password": "123456"
}
```

---

### 🔹 Login

```
POST /login
```

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

## 📌 Task Endpoints

### 🔹 Get All Tasks

```
GET /tasks
```

### Query Parameters

| Parameter | Description         |
| --------- | ------------------- |
| page      | nomor halaman       |
| limit     | jumlah data         |
| status    | pending / completed |
| search    | keyword title       |
| sort      | field (id, title)   |
| order     | asc / desc          |

### Example Request

```
GET /tasks?page=1&limit=10&status=pending&search=node&sort=title&order=desc
```

### Example Response

```
{
  "page": 1,
  "limit": 10,
  "total": 5,
  "data": [
    {
      "id": 1,
      "title": "Belajar Node",
      "status": "pending",
      "user_id": 11
    }
  ]
}
```

---

### 🔹 Create Task

```
POST /tasks
```

Header:

```
Authorization: Bearer TOKEN
```

Body:

```
{
  "title": "Belajar Backend"
}
```

---

### 🔹 Update Task

```
PUT /tasks/:id
```

Body:

```
{
  "title": "Update Task",
  "status": "completed"
}
```

---

### 🔹 Delete Task

```
DELETE /tasks/:id
```

---

## 🧪 Testing

Gunakan Postman:

```
task-api.postman_collection.json
```

---

## 👤 Author

Syahri Rizki Ramadhan Harahap
Informatics Graduate
