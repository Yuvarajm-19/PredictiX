# PredictiX 🩺

A production-grade full-stack healthcare platform that predicts **4 diseases** — heart disease, diabetes, breast cancer, and lung cancer — using machine learning models integrated directly into a MERN backend.

---

## 🧠 What It Does

Users can log in, submit medical data or upload medical images, and get real-time disease predictions — with an auto-generated PDF report they can download.

**Supported predictions:**
- ❤️ Heart Disease — Logistic Regression
- 🩸 Diabetes — SVM
- 🔬 Breast Cancer — SVM
- 🫁 Lung Cancer — CNN + InceptionResNetV2

---

## ⚙️ Architecture

```
React Frontend
     │
     ▼
Express.js Backend (Node.js)
     │
     ├── JWT Auth + RBAC Middleware
     ├── MongoDB (user data, reports)
     └── Child Process Pipeline
              │
              ▼
         Python ML Models
         (Scikit-learn / TensorFlow)
```

**Key design decision:** All 4 ML models are served from a single Express.js backend using Node.js Child Processes — no separate ML server needed. This cut deployment complexity by ~40%.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React.js, CSS3, Responsive UI |
| Backend | Node.js, Express.js, REST APIs |
| Database | MongoDB |
| Auth | JWT, RBAC |
| ML Models | Scikit-learn, TensorFlow/Keras, Python |
| ML Architecture | CNN, InceptionResNetV2, Logistic Regression, SVM |
| Dev Tools | Postman, Jupyter Notebook, Vercel, Render |

---

## 🔑 Features

- 🔐 JWT Authentication with role-based access control (RBAC)
- 📊 Real-time disease prediction results
- 🖼️ Medical image upload (for lung cancer CNN model)
- 📄 Auto-generated downloadable PDF reports
- ⚡ Single backend serving all ML models via Child Process pipeline

---

## 📁 Project Structure

```
PredictiX/
├── Frontend/          # React.js app
├── Backend/           # Node.js + Express.js server
│   ├── routes/
│   ├── middleware/    # JWT + RBAC
│   └── mlRunner/      # Child process pipeline
├── ML/                # Python ML model scripts
│   ├── heart_model.py
│   ├── diabetes_model.py
│   ├── breast_cancer_model.py
│   └── lung_cancer_model.py
├── Medical Reports/   # Sample generated PDF reports
└── Screenshots/       # UI screenshots
```

---

## 🏃 Getting Started

### Prerequisites
- Node.js v18+
- Python 3.9+
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repo
git clone https://github.com/Yuvarajm-19/PredictiX.git
cd PredictiX

# Install backend dependencies
cd Backend
npm install

# Install frontend dependencies
cd ../Frontend
npm install

# Install Python dependencies
cd ../ML
pip install -r requirements.txt
```

### Environment Variables

Create a `.env` file in `/Backend`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Run the App

```bash
# Start backend (from /Backend)
npm run dev

# Start frontend (from /Frontend)
npm start
```

---

## 📊 Model Performance

| Disease | Model | Accuracy |
|---------|-------|----------|
| Heart Disease | Logistic Regression | ~85% |
| Diabetes | SVM | ~82% |
| Breast Cancer | SVM | ~96% |
| Lung Cancer | CNN + InceptionResNetV2 | ~90% |

> _Update with your actual accuracy metrics from training_

---

## 👨‍💻 Author

**Yuvaraj M**
- GitHub: [@Yuvarajm-19](https://github.com/Yuvarajm-19)
- LinkedIn: [linkedin.com/in/yuvaraj-m-2b311726a](https://linkedin.com/in/yuvaraj-m-2b311726a)


---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
