from fastapi import APIRouter, HTTPException
import subprocess
import os

router = APIRouter()

@router.post("/")
async def retrain_model(admin_key: str = ""):
    if admin_key != "secret_admin_key":
        raise HTTPException(status_code=401, detail="Unauthorized")
        
    script_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../../../ml/train.py")
    
    if not os.path.exists(script_path):
        raise HTTPException(status_code=500, detail="Training script not found")
        
    # Start the training asynchronously or wait. Since we want a stub:
    try:
        # Popen doesn't wait
        subprocess.Popen(["python", script_path])
        return {"status": "success", "message": "Model retraining started in the background."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
