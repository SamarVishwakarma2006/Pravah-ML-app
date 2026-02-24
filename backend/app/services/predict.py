import os
import joblib
import pandas as pd
from app.schemas.predict import PredictRequest

# Load the model once when the service is imported
_MODEL_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../../ml/model.joblib")
_model = None

def get_model():
    global _model
    if _model is None:
        if os.path.exists(_MODEL_PATH):
            _model = joblib.load(_MODEL_PATH)
        else:
            raise RuntimeError("Model file not found. Please train the model first.")
    return _model

def make_prediction(request: PredictRequest) -> float:
    model = get_model()
    # Create DataFrame for prediction
    df = pd.DataFrame([request.model_dump()])
    # Predict
    predicted_price = model.predict(df)[0]
    return float(predicted_price)
