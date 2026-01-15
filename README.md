# 🔐 AuthHub — Full Stack Authentication System

AuthHub is a full-stack authentication system built using React, Node.js, Express, MongoDB, and JWT.  
It implements a complete and secure authentication flow including signup, login, JWT-based authentication, protected routes, and logout.

This project focuses on real-world authentication concepts, proper backend–frontend integration, and clean project structure.

---

## 🚀 Features

### Authentication
- User Signup with validation
- User Login with encrypted passwords
- Secure password hashing using bcrypt
- JWT-based authentication
- Logout functionality

### Authorization
- Protected dashboard route
- Backend JWT verification using middleware
- Token validation via `/me` API

### Frontend
- Built with React + Vite
- Clean UI with form validation
- Error and success messages
- Password visibility toggle
- Dashboard with logout button

### Backend
- Node.js + Express REST API
- MongoDB Atlas for database
- Mongoose for data modeling
- Environment variables using dotenv
- CORS-enabled backend
- Proper backend folder structure

---

## 🧱 Tech Stack

### Frontend
- React
- Vite
- React Router DOM
- Tailwind CSS
- Lucide Icons

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (jsonwebtoken)
- bcrypt
- dotenv
- cors

---

## 🔑 Authentication Flow

1. Signup
   - User registers using email and password
   - Password is hashed and stored in MongoDB

2. Login
   - Credentials are verified
   - JWT token is generated and sent to frontend

3. Protected Routes
   - JWT is stored in `localStorage`
   - Token is verified by backend on protected routes
   - Unauthorized users are redirected to login

4. Logout
   - JWT token is removed from browser storage
   - User is redirected to login page

---

## 🧪 API Endpoints

POST /api/auth/signup → Register user
POST /api/auth/login → Login user
GET /api/auth/me → Verify JWT (protected)

▶️ Running the Project Locally
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev


Backend runs on: http://localhost:5000
Frontend runs on: http://localhost:5173


