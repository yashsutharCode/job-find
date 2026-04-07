# Job Portal 💼 

A professional, full-stack MERN application designed to connect job seekers with recruiters. This platform features a clean, minimal UI and a robust backend to manage job postings, applications, and user profiles.

🚀 **Live Demo:** [https://job-find-8.onrender.com](https://job-find-8.onrender.com)

---

## 🛠️ Tech Stack

### **Frontend**
* **React.js & Vite** – For a fast, modern development experience.
* **Redux Toolkit** – Managing global state for Auth, Jobs, and Companies.
* **Tailwind CSS & Shadcn UI** – Creating a clean, professional, and responsive design.
* **Framer Motion** – Smooth UI transitions and animations.

### **Backend**
* **Node.js & Express.js** – Scalable server-side architecture.
* **MongoDB & Mongoose** – NoSQL database for flexible data modeling.
* **JWT & BcryptJS** – Secure authentication and password hashing.
* **Cloudinary** – Handling image uploads for profile pictures and company logos.

---

## ✨ Key Features

* **Dual Dashboards:** Custom interfaces for both **Recruiters** (to post jobs) and **Job Seekers** (to apply).
* **Advanced Job Filtering:** Search and filter jobs by location, industry, and salary.
* **Profile Management:** Users can update their skills, bio, and upload resumes.
* **Recruitment Tools:** Recruiters can create company profiles and manage applicants in real-time.
* **Secure Auth:** Protected routes and secure cookie-based session management.
* **Responsive Design:** Optimized for a seamless experience on mobile, tablet, and desktop.

---

## 📂 Project Structure

```text
JOB-PORTAL/
├── BACKEND/
│   ├── controllers/    # Server logic for Users, Jobs, and Companies
│   ├── middlewares/    # Authentication & File upload (Multer) logic
│   ├── models/         # MongoDB Schemas (User, Job, Company, Application)
│   ├── routes/         # API Endpoints
│   ├── utils/          # Database connection & Cloudinary config
│   └── index.js        # Main server entry point
├── FRONTEND/
│   ├── src/
│   │   ├── components/ # UI, Admin, and Auth components
│   │   ├── hooks/      # Custom React hooks for data fetching
│   │   ├── redux/      # State management (slices & store)
│   │   ├── lib/        # Utility functions
│   │   └── App.jsx     # Main Routing & App structure
└── README.md           # Project documentation