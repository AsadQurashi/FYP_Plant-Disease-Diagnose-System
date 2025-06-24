# 🌿 Plant Disease Diagnose System

This is a Flask-based web backend that uses a trained machine learning model to predict plant diseases from user-uploaded images. It also includes user authentication and stores data using SQLAlchemy with a relational database.

## 📁 Project Structure

Backend/
├── plant-main/
│ ├── project/
│ │ ├── api.py
│ │ ├── app/
│ │ │ ├── bl/ # Business logic
│ │ │ ├── model/ # SQLAlchemy models
│ │ │ ├── repository/ # DB operations
│ │ │ ├── schema/ # Pydantic schemas
│ │ │ ├── utils/ # Helper classes
│ │ │ └── db.py # Database configuration
│ │ ├── blueprint/ # Flask blueprints
│ │ └── decorator.py # JWT and role-based auth
│ ├── req.txt
│ └── runDebug.py

yaml
Copy
Edit

---

## ⚙️ Technologies Used

- **Backend**: Flask (Python)
- **Database**: SQLite / PostgreSQL (via SQLAlchemy)
- **Authentication**: JWT (JSON Web Token)
- **ML Model**: Trained Keras `.h5` model
- **Image Input**: Upload image for prediction

---

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/AsadQurashi/FYP_Plant-Disease-Diagnose-System.git
cd FYP_Plant-Disease-Diagnose-System/Backend/plant-main
2. Create and Activate a Virtual Environment
bash
Copy
Edit
python -m venv env
source env/bin/activate   # Linux/macOS
env\Scripts\activate      # Windows
3. Install Dependencies
bash
Copy
Edit
pip install -r req.txt
🚀 Running the App
bash
Copy
Edit
python runDebug.py
By default, the app runs on:
cpp
Copy
Edit
http://127.0.0.1:5000/
🧠 Model Info
Trained using CNN on augmented plant disease image dataset.
Model file: trained_model.h5
Located in: project/app/bl/ or project/blueprint/

🛠 API Endpoints
POST /predict: Upload an image for prediction
POST /register: Register new user
POST /login: Get JWT token
GET /users: Get all users (admin only)

📂 Dataset
Located in:
mathematica
Copy
Edit
/Dataset/New Plant Diseases Dataset(Augmented)/
Includes augmented plant leaf images labeled by disease type.

🔒 Security
Role-based access via decorators
JWT authentication for all protected routes

✍️ Authors
Asad Qurashi
COMSATS University Abbottabad, Final Year Project
