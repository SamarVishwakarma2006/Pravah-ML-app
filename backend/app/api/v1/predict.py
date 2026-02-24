from fastapi import APIRouter
from app.schemas.predict import PredictRequest, PredictResponse
from app.services.predict import make_prediction

router = APIRouter()

@router.post("/", response_model=PredictResponse)
async def predict_price(request: PredictRequest):
    price = make_prediction(request)
    return PredictResponse(predicted_price=price)
