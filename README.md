# Pravah-ML-app - Navi Mumbai House Price Prediction

A production-grade Machine Learning web application for predicting house prices in Navi Mumbai. 

## Architecture

- **Backend**: FastAPI (Python), providing high-performance async endpoints.
- **Frontend**: Next.js (TypeScript, Tailwind CSS), Server Components, and App Router.
- **Machine Learning**: Gradient Boosting Regressor (Scikit-Learn).

## Project Structure

- `backend/`: FastAPI server and ML pipeline.
- `frontend/`: Next.js web application.
- `navi_mumbai_real_estate_uncleaned_2500 (1)_cleaned.csv`: Original dataset for ML training.

## Local Development

### 1. Backend Setup

```bash
cd backend
python -m venv venv
# On Windows: .\venv\Scripts\activate
# On Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
python ml/train.py # Trains the model and generates 'model.joblib'
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
API Documentation will be at http://localhost:8000/docs

### 2. Frontend Setup

```bash
cd frontend
npm install
# Rename .env.example to .env and set NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev
```
The app will be running at http://localhost:3000

## Deployment

### Backend (Render)
1. Go to [Render](https://render.com/), create a new **Web Service**.
2. Connect your repository.
3. Configure settings to match the provided `render.yaml`.
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt && python ml/train.py`
   - Start Command: `gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker`
4. Set Environment Variables:
   - `BACKEND_CORS_ORIGINS`: '["https://your-frontend-domain.vercel.app"]'

### Frontend (Vercel)
1. Go to [Vercel](https://vercel.com/), create a new Project.
2. Select the `frontend` folder as the Root Directory.
3. Add Environment Variable `NEXT_PUBLIC_API_URL` pointing to your Render Backend URL. (e.g., `https://navi-estimate-backend.onrender.com`).
4. Connect and Deploy!

## API Endpoints

- `GET /api/v1/health` - Health check.
- `POST /api/v1/predict` - Make price prediction.
- `GET /api/v1/model-info` - Fetch Model metadata and features.
- `POST /api/v1/retrain` - Background training stub endpoint.
