# Potato Disease Classification

This project aims to detect and classify potato leaf diseases using Convolutional Neural Networks (CNNs). It includes a machine learning model, a backend API to serve the model, and a frontend user interface for uploading and diagnosing images.

## Project Structure

- `api/` - The backend web API (likely FastAPI or Flask) which loads the trained model and exposes an endpoint for inference.
- `frontend/` - The web-based frontend application for users to interact with.
- `models/` - Contains the trained models and configuration files.
- `potatoooooooo/` - Includes Jupyter notebooks used for training the models and the `PlantVillage` dataset.

## Setup

### Backend (API)
1. Go to the `api/` directory.
2. Install dependencies: `pip install -r requirements.txt`
3. Run the backend server.

### Frontend
1. Go to the `frontend/` directory.
2. Install dependencies: `npm install`
3. Start the application: `npm start` or `npm run dev` (refer to frontend docs)

### Model Training
- Navigate to `potatoooooooo/` and run `model.ipynb` using Jupyter Notebook to explore data, train the model, and evaluate its performance.
