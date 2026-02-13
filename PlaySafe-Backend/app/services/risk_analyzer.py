import joblib
import numpy as np
from app.config import BASELINE_PATH

def analyze_risk(player_id, features):
    model = joblib.load(BASELINE_PATH + f"{player_id}.pkl")

    X = np.array([[f["left_knee_angle"]] for f in features])

    scores = model.decision_function(X)
    anomaly = model.predict(X)

    risk_score = float(abs(scores.mean()))

    if risk_score < 0.1:
        level = "LOW"
    elif risk_score < 0.3:
        level = "MODERATE"
    else:
        level = "HIGH"

    return {
        "player_id": player_id,
        "risk_score": risk_score,
        "risk_level": level,
        "deviation_summary": {
            "anomaly_frames": int((anomaly == -1).sum())
        }
    }
