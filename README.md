# 🌿 Plant Disease Diagnose System

The **Plant Disease Diagnose System** is an AI-powered mobile application that detects and identifies plant diseases through leaf image analysis. By leveraging a custom-trained **Convolutional Neural Network (CNN)** model, the app enables users to take photos of plant leaves and receive instant disease diagnoses, treatment suggestions, and historical health tracking.

---

## 🚀 Features

- 📷 **Real-time Leaf Image Capture** – Capture leaf images directly through the mobile app camera.
- 🧠 **Deep Learning Model (CNN)** – Identifies plant diseases from images with high accuracy.
- 💡 **Instant Diagnosis** – Provides the name and description of the detected disease.
- 🩺 **Treatment Suggestions** – Offers recommended solutions and preventive measures.
- 📊 **Diagnosis History** – Maintains records of previous scans for health tracking.
- 🔔 **Smart Notifications** – Reminds users to check plant health regularly.

---

## 🛠️ Tech Stack

| Layer       | Technology                          |
|-------------|--------------------------------------|
| Frontend    | React Native                         |
| Backend     | Flask (Python)                       |
| AI/ML Model | TensorFlow / Keras (CNN-based model) |

---

## 📂 How It Works

1. **User opens the app** and uses the camera to capture a leaf image.
2. **Image is sent** to a Flask backend server.
3. **Backend processes** the image using a trained CNN model.
4. **Disease is identified** and response is sent back with:
   - Disease name
   - Description
   - Treatment tips
5. **Result is shown** in the app with the option to view past results.


