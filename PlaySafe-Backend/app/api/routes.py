from fastapi import APIRouter, UploadFile, File, Form
import shutil
import os

from app.services.video_processor import process_video
from app.services.baseline_model import train_baseline
from app.services.risk_analyzer import analyze_risk

router = APIRouter()

# Ensure upload folder exists
os.makedirs("data/uploads", exist_ok=True)


@router.post("/upload-baseline/")
async def upload_baseline(
    player_id: str = Form(...),
    file: UploadFile = File(...)
):
    path = f"data/uploads/{file.filename}"

    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    features = process_video(path)
    train_baseline(player_id, features)

    return {
        "status": "success",
        "message": "Baseline trained successfully"
    }


@router.post("/analyze-match/")
async def analyze_match(
    player_id: str = Form(...),
    file: UploadFile = File(...)
):
    path = f"data/uploads/{file.filename}"

    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    features = process_video(path)
    result = analyze_risk(player_id, features)

    return {
        "status": "success",
        "analysis": result
    }
