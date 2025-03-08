# Fypper
Fypper is a free platform designed to form final year project teams by matching compatible teammates, connecting with supervisors who have relevant expertise, and securing industry sponsorships and mentorship opportunities. It is a web application made with a strong focus on user-friendly experience.

# React + Flask App Setup Guide

Welcome to the React + Flask app! This guide will walk you through the steps to set up and run the project.

---

## **Video Followed**
https://www.youtube.com/watch?v=7LNl2JlZKHA

**Disclaimer** The video I used to follow it was done by using basic react. I used Vite + React. Everything is same except the running and building configurations

## 🚀 **Prerequisites**
Ensure you have the following installed on your system:
- **Python** 
- **Node.js** 
- **npm** (comes with Node.js)
- **pip** (Python's package installer)

---

## ⚙️ **Backend Setup (Flask)**

1. **Create a virtual environment:**
   ```bash
   python -m venv venv
   ```
2. **Activate the virtual environment:**
   - **Windows:**
     ```bash
     venv\Scripts\activate
     ```
   - **Mac/Linux:**
     ```bash
     source venv/bin/activate
     ```
3. **Install Flask and CORS:**
   ```bash
   pip install flask flask-cors
   ```
4. **Run the Flask server:**
   ```bash
   python server.py
   ```
5. The backend should now be running at:
   ```
   http://127.0.0.1:5000
   ```

---

## 🌟 **Frontend Setup (React + Vite)**

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the React development server:**
   ```bash
   npm run dev
   ```
3. The frontend should now be running at (usually):
   ```
   http://localhost:5173
   ```

---

## 🔥 **Connecting Frontend and Backend**

1. Ensure the **proxy** is correctly set in `package.json`:
   ```json
   "proxy": "http://127.0.0.1:5000"
   ```
2. The `useEffect` hook in `App.jsx` should correctly fetch data from the backend:
   ```javascript
   fetch("/members")
     .then(res => res.json())
     .then(data => setData(data))
     .catch(error => console.error("Error fetching members:", error));
   ```

---

## ✅ **Testing**

1. Start both the backend and frontend servers simultaneously.
2. Open your browser and visit the frontend URL (usually `http://localhost:5173`).
3. Verify the member data fetched from Flask is correctly displayed.

---

## 📦 **Troubleshooting**

- **Proxy issues:**
  Ensure both the frontend and backend servers are running on the correct ports.
- **CORS errors:**
  Double-check that `flask-cors` is installed and correctly used in `server.py`:
  ```python
  from flask_cors import CORS
  CORS(app)
  ```
- **Dependency errors:**
  If there are missing packages, reinstall dependencies:
  ```bash
  npm install
  pip install flask flask-cors
  ```

---

Happy coding! 🎉



