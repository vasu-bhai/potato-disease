# Potato Disease Classifier 🥔🍃

An end-to-end deep learning application that detects and classifies diseases in potato leaves with **97.8% validation accuracy**. Upload a photo of a potato leaf and the system instantly predicts whether it is **Healthy**, suffering from **Early Blight**, or **Late Blight** — along with a confidence score.

> **Live demo:** _[Deploy to Hugging Face Spaces or Render and add your link here]_

---

## Demo

> _Add a GIF or screenshot here. Example: record a screen capture of dragging a leaf image into the app._
>
> ```
> ![App demo](docs/demo.gif)
> ```

---

## Model performance

| Metric | Value |
|---|---|
| Training accuracy | 99.2% |
| Validation accuracy | 97.8% |
| Dataset | PlantVillage (2,152 images) |
| Classes | Healthy · Early Blight · Late Blight |
| Architecture | CNN (TensorFlow / Keras) |
| Input size | 256 × 256 px |

---

## Architecture

The project is split into three independently deployable components:

```
potato-disease/
├── api/             # FastAPI backend — receives images, calls model server
├── frontend/        # React + Material-UI drag-and-drop UI
├── models/          # TF Serving saved model (potatoes_model/1/)
├── training/        # Jupyter notebooks — data prep, training, evaluation
├── models.config    # TF Serving config
└── README.md
```

**Request flow:**

```
User uploads image
       ↓
React frontend (port 3000)
       ↓ POST /predict
FastAPI backend (port 8000)
       ↓ gRPC
TF Serving (port 8502)
       ↓
Prediction + confidence score returned to UI
```

---

## Tech stack

| Layer | Technology |
|---|---|
| Model training | TensorFlow · Keras · Jupyter |
| Model serving | TensorFlow Serving (Docker) |
| Backend API | FastAPI · Python · Uvicorn |
| Frontend | React · Material-UI |
| Dataset | PlantVillage (via TensorFlow Datasets) |

---

## Setup & installation

You need three services running simultaneously.

### Prerequisites

- Python 3.9+
- Node.js 16+
- Docker (for TF Serving)

---

### 1. Model serving (TensorFlow Serving)

```bash
docker pull tensorflow/serving

docker run -it --rm -p 8502:8501 \
  --mount type=bind,source=$(pwd)/models,target=/models/potato \
  -e MODEL_NAME=potato \
  tensorflow/serving
```

Or point to the `models.config` file directly:

```bash
docker run -it --rm -p 8502:8501 \
  --mount type=bind,source=$(pwd),target=/potato \
  tensorflow/serving \
  --model_config_file=/potato/models.config
```

---

### 2. Backend API (FastAPI)

```bash
cd api
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

API will be available at `http://localhost:8000`. Docs at `http://localhost:8000/docs`.

---

### 3. Frontend (React)

```bash
cd frontend
npm install
npm start
```

App will open at `http://localhost:3000`.

> Make sure the FastAPI backend is running before starting the frontend.

---

## Usage

1. Open `http://localhost:3000` in your browser.
2. Drag and drop a potato leaf image into the upload area (or click to browse).
3. The model returns a prediction and confidence score within 1–2 seconds.

---

## Training

Notebooks are located in the `training/` folder:

| Notebook | Description |
|---|---|
| `training.ipynb` | Data loading, augmentation, CNN architecture, training loop |
| `evaluation.ipynb` | Confusion matrix, per-class accuracy, sample predictions |

The model was trained on the **PlantVillage** dataset using TensorFlow Datasets with image augmentation (random flip, rotation, zoom) to improve generalisation.

---

## Future improvements

- [ ] Deploy to Hugging Face Spaces or Render
- [ ] Add Grad-CAM heatmaps to show which leaf regions triggered the prediction
- [ ] Expand to more crop diseases beyond potato
- [ ] Add mobile-responsive design
- [ ] Write unit tests for the FastAPI endpoints

---

## License

MIT — free to use and modify.
