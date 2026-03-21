# Potato Disease Classification 🥔🍃

This project is a complete, end-to-end Deep Learning application designed to detect and classify diseases in potato leaves. By uploading an image of a potato leaf, the system uses a Convolutional Neural Network (CNN) to predict whether the leaf is **Healthy**, or if it suffers from **Early Blight** or **Late Blight**.

The application features a modern Machine Learning architecture separated into a fast API backend, a dedicated model serving container, and an interactive React frontend.

## 🏗️ Architecture & Technologies

The project is broken into three main components:

1. **Frontend (React)**: 
   - A user-friendly web interface built with **React** and **Material-UI**.
   - Users can drag and drop images of potato leaves into the browser to get real-time disease predictions and confidence scores.
   
2. **Backend API (FastAPI)**:
   - A highly performant API built with **FastAPI**.
   - Acts as the middleman that receives the uploaded image, validates it, and preprocesses it into an array format.
   - Forwards the preprocessed data to the model server and relays the result back to the React UI.

3. **Model Serving (TensorFlow Serving)**:
   - The trained CNN model is hosted using **TensorFlow Serving** (`localhost:8502`).
   - This keeps the heavy machine learning inference isolated from the API web server for maximum performance and scalability.
   - (*Note: The model was trained using TensorFlow/Keras on the PlantVillage dataset using the Jupyter notebooks located in the `potatoooooooo` folder.*)

---

## 🚀 Setup & Installation

To run this project, you need to spin up the three environments:

### 1. Model Serving (TensorFlow Serving)
You must have Docker or a local TensorFlow Model Server running that points to your saved model directory on port `8502`.
*(Note: Ensure your `models.config` points to your `models/` directory correctly).*

### 2. Backend API
1. Open a terminal and navigate to the `api` directory:
   ```bash
   cd api
   ```
2. Install the required Python packages (it is recommended to use a virtual environment):
   ```bash
   pip install -r requirements.txt
   ```
3. Run the FastAPI server:
   ```bash
   python main.py
   # Alternatively: uvicorn main:app --host localhost --port 8000
   ```

### 3. Frontend Web App
1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the Node modules:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```

*(Ensure the backend is running before testing the frontend, as React communicates with the FastAPI layer!)*
"# potato-disease" 
