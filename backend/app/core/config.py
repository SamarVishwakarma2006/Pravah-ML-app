import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Navi Mumbai House Price Prediction API"
    API_V1_STR: str = "/api/v1"
    BACKEND_CORS_ORIGINS: list[str] = ["*"] # Adjust in production
    
    class Config:
        env_file = ".env"

settings = Settings()
