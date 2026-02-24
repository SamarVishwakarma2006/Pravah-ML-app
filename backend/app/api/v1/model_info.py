from fastapi import APIRouter
from pydantic import BaseModel
import os
import datetime

router = APIRouter()

class ModelInfoResponse(BaseModel):
    version: str
    features_used: list[str]
    training_date: str

@router.get("/", response_model=ModelInfoResponse)
async def get_model_info():
    _MODEL_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../../../ml/model.joblib")
    training_date = "Not Trained"
    if os.path.exists(_MODEL_PATH):
        timestamp = os.path.getmtime(_MODEL_PATH)
        training_date = datetime.datetime.fromtimestamp(timestamp).isoformat()
        
    features = ["location", "area_sqft", "bhk", "bathrooms", "floor", "total_floors", "age_of_property", "parking", "lift"]
    
    return ModelInfoResponse(
        version="1.0-gb-regressor",
        features_used=features,
        training_date=training_date
    )
