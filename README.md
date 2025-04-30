
src/
│
├── components/        # Reusable UI components
├── pages/             # Main routes (Home, Login, Admin etc.)
├── services/          # Axios API logic
├── utils/             # Utility functions
📜 License
MIT – Feel free to fork and build on top!



---

## 📁 Backend – `packify-backend/README.md`

```markdown
# 🛫 Packify – Travel Package Booking Backend

This is the backend of the **Packify** application built using **Node.js**, **Express**, and **MongoDB**, with support for **JWT authentication** and **Google OAuth**.

## 🌐 Hosted Backend

[Backend on Render](https://packify-backend.onrender.com)

---

## ⚙️ Tech Stack

- **Node.js + Express.js**
- **MongoDB (via Mongoose)**
- **JWT Authentication**
- **Google OAuth 2.0**
- **Cloudinary (for image upload)**
- **Multer (file handling)**

---

## 🧰 Features

- User & Admin Authentication (JWT & Google)
- CRUD Travel Packages
- Bookings with customizable options
- Admin analytics & reports
- Profile update, image upload, secure API

---

## 📦 Environment Variables

Create a `.env` file in the root directory with the following:

PORT=5000 MONGO_URI=your_mongodb_connection_string JWT_SECRET=your_jwt_secret CLOUDINARY_CLOUD_NAME=your_cloudinary_name CLOUDINARY_API_KEY=your_cloudinary_key CLOUDINARY_API_SECRET=your_cloudinary_secret GOOGLE_CLIENT_ID=your_google_client_id



---

## 📁 Folder Structure

src/ ├── controllers/ # All logic (auth, packages, bookings) ├── routes/ # All Express routes ├── models/ # Mongoose models ├── middleware/ # Auth middleware ├── config/ # DB & cloudinary config └── server.ts # Entry point



---

## 🛠 Setup Instructions

```bash
git clone https://github.com/your-username/packify-backend.git
cd packify-backend
npm install
npm run build
npm start
For development:


npm run dev
🌐 API Base URL

https://packify-backend.onrender.com/api
🔐 Routes Overview
Auth
POST /api/auth/register

POST /api/auth/login

POST /api/auth/google

POST /api/auth/adminlogin

Users
GET /api/users/me

PUT /api/users/me

GET /api/users/getallusers

Packages
GET /api/packages

POST /api/packages

PUT /api/packages/:id

DELETE /api/packages/:id

Bookings
GET /api/bookings

GET /api/bookings/my

POST /api/bookings

PUT /api/bookings/:id

Upload
POST /api/upload

📜 License
MIT – Build and improve it as you like!



---

Let me know if you want a sample `screen-recording` script or a GitHub-friendly project structure!