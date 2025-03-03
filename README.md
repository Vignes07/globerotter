# Globetrotter - A Travel Trivia Web App

Globetrotter is a **MERN stack** web application where users guess travel destinations based on cryptic clues. The app includes **AI-generated datasets, fun facts, trivia, scoring, and a 'Challenge a Friend' feature** for an engaging user experience.

---

## 🚀 Features

### 🌍 Frontend (React.js + Tailwind CSS)
- **Interactive UI** for playing travel trivia.
- **Social sharing** options to challenge friends.
- **AI-generated clues and facts** for destinations.
- **Responsive design** optimized for all devices.

### ⚡ Backend (Node.js + Express + MongoDB)
- **AI-powered clue generation API integration.**
- **RESTful API for managing trivia questions.**
- **Database storage for user scores & challenges.**

---

## 📌 Getting Started

### ✅ Prerequisites
Ensure you have the following installed:
- **Node.js** (latest LTS version recommended)
- **MongoDB** (local or cloud-based like MongoDB Atlas)
- **npm** or **yarn**

---

## 📥 Installation

### 🖥️ Frontend Setup
```bash
git clone https://github.com/Vignes07/globetrotter-frontend.git
cd globetrotter-frontend
npm install
npm run dev
```
The application will be available at **http://localhost:5173**.

### 🖥️ Backend Setup
```bash
git clone https://github.com/Vignes07/globetrotter-backend.git
cd globetrotter-backend
npm install
```
#### Set up environment variables (`.env` file):
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINII_API_KEY=your_api_key (if using AI clue generation)
```
Start the backend server:
```bash
npm start
```
The API will run at **http://localhost:5000**.

---

## 📄 License
This project is licensed under the **MIT License**.

---

