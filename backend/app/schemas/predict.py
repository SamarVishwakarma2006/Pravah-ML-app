from pydantic import BaseModel, Field

class PredictRequest(BaseModel):
    location: str = Field(..., description="Location in Navi Mumbai")
    area_sqft: float = Field(..., description="Area in Square Feet")
    bhk: float = Field(..., description="Number of Bedrooms")
    bathrooms: float = Field(..., description="Number of Bathrooms")
    floor: float = Field(..., description="Floor Number")
    total_floors: float = Field(..., description="Total Floors in Building")
    age_of_property: float = Field(..., description="Age of the property in years")
    parking: int = Field(..., description="Number of Parking slots (0 or 1)")
    lift: int = Field(..., description="Has Lift (0 or 1)")

class PredictResponse(BaseModel):
    predicted_price: float
    currency: str = "INR"
    model_version: str = "1.0"
