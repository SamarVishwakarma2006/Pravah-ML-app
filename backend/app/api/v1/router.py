from fastapi import APIRouter
from app.api.v1 import predict, health, model_info, retrain

api_router = APIRouter()
api_router.include_router(health.router, prefix="/health", tags=["Health"])
api_router.include_router(predict.router, prefix="/predict", tags=["Predict"])
api_router.include_router(model_info.router, prefix="/model-info", tags=["Model Info"])
api_router.include_router(retrain.router, prefix="/retrain", tags=["Retrain"])
