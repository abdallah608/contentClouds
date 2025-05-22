# Content Clouds - User Management API

A robust REST API built with Node.js, Express, and PostgreSQL for user management with advanced features like filtering, pagination, and searching.

## 🚀 Features

- **User Management**
  - Create, read, update, and delete users
  - Advanced filtering and search capabilities
  - Pagination support

- **Performance Optimizations**
  - Database connection pooling
  - Query optimization
  - Rate limiting

- **Security**
  - Input validation
  - Rate limiting
  - Error handling

## 📋 Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/content-clouds.git
   cd content-clouds
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a PostgreSQL database:
   ```sql
   CREATE DATABASE usertest;
   ```

4. Create a `.env` file in the root directory:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=usertest
   DB_USER=your_postgres_username
   DB_PASSWORD=your_postgres_password

   ```

5. Start the server:
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## 📚 API Documentation

### https://documenter.getpostman.com/view/24697308/2sB2qaiMfL

   ## 📦 Project Structure

content-clouds/
├── src/
│ ├── config/
│ │ └── dataBase.js
│ ├── models/
│ │ └── user.js
│ ├── modules/
│ │ └── user/
│ │ ├── controllers/
│ │ ├── routes/
│ │ └── validation/
│ ├── utilities/
│ │ ├── ApiFeature/
│ │ └── error/
│ └── middleware/
├── .env
├── index.js
└── package.json


