from fastapi import APIRouter, UploadFile, File, Form
import shutil
import os

from app.services.video_processor import process_video
from app.services.feature_engineer import compute_formation_metrics
from app.services.risk_analyzer import analyze_tactics


router = APIRouter()

# Ensure upload folders exist
UPLOAD_DIR = "data/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


# ==============================
# BASELINE TRAIN / PLAYER RISK
# ==============================
@router.post("/upload-baseline/")
async def upload_baseline(
    player_id: str = Form(...),
    file: UploadFile = File(...)
):
    try:
        file_path = os.path.join(UPLOAD_DIR, file.filename)

        # Save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Process video
        video_data = process_video(file_path)

        # Analyze risk
        
        return {
            "status": "success",
            "analysis": result,
            "processed_video": video_data.get("processed_video_path")
        }

    except Exception as e:
        return {"status": "error", "message": str(e)}


# ==============================
# MATCH ANALYSIS (FORMATION + GOAL RATE)
# ==============================
@router.post("/analyze-match/")
async def analyze_match(
    player_id: str = Form(...),
    file: UploadFile = File(...)
):
    try:
        file_path = os.path.join(UPLOAD_DIR, file.filename)

        # Save uploaded match video
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Step 1: Process video (detect players, draw lines, jersey colors)
        video_data = process_video(file_path)

        # Expected from process_video:
        # {
        #   "teamA_positions": [...],
        #   "teamB_positions": [...],
        #   "processed_video_path": "data/processed/xyz.mp4"
        # }

        # Step 2: Compute formation metrics
        metrics_A = compute_formation_metrics(video_data["teamA_positions"])
        metrics_B = compute_formation_metrics(video_data["teamB_positions"])

        # Step 3: Tactical analysis (formation + goal probability)
        tactical_A = analyze_tactics(metrics_A)
        tactical_B = analyze_tactics(metrics_B)

        return {
            "status": "success",
            "teamA": {
                "formation": tactical_A["formation"],
                "goal_probability": tactical_A["goal_probability"],
                "tactical_score": tactical_A["tactical_score"]
            },
            "teamB": {
                "formation": tactical_B["formation"],
                "goal_probability": tactical_B["goal_probability"],
                "tactical_score": tactical_B["tactical_score"]
            },
            "processed_video": video_data.get("processed_video_path")
        }

    except Exception as e:
        return {"status": "error", "message": str(e)}
