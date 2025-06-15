# 🏨 Hotel Room Reservation System

> SDE-3 Level Full Stack Project for Unstop | Developed by **Aftab**

A smart, responsive hotel booking system that lets users reserve multiple rooms across 10 floors, optimizing for travel time. Includes room type selection, date-based availability, preview, and a protected admin panel.

---

## ✨ Features

- ✅ Book N rooms with travel-time optimization
- ✅ Floor-wise room layout (Floors 1–10, Rooms 101–110, etc.)
- ✅ Room types: AC, Non-AC, Suite
- ✅ Date-based room mapping
- ✅ Live booking preview before confirmation
- ✅ Admin Panel: reset, randomize, toggle occupancy
- ✅ Protected admin login page
- ✅ Modern Tailwind CSS UI + room icons

---

## 🛠 Tech Stack

| Layer       | Technology                              |
|-------------|-----------------------------------------|
| Frontend    | React, Tailwind CSS, Axios, React Icons |
| Backend     | Node.js, Express                        |
| Data Store  | In-memory (Map by date)                 |
| Routing     | React Router DOM                        |

---

## 🔐 Admin Credentials

```bash
Username: admin
Password: admine56

How to Run Locally
Backend (Port: 5000)
cd backend
npm install
node server.js

Frontend (Port: 3000)
bash
Copy
Edit
cd frontend
npm install
npm start
Then open 👉 http://localhost:3000

Folder Structure
hotel-room-reservation/
├── backend/
│   ├── logic/bookingLogic.js
│   ├── server.js
├── frontend/
│   ├── src/components/
│   ├── src/pages/
│   ├── src/App.jsx
│   ├── src/index.css
├── README.md

## 📸 Screenshots

### Booking Page
![Booking](screenshots/Screenshot 2025-06-15 230431.png")
![Booking](screenshots/Screenshot 2025-06-15 230410.png)

