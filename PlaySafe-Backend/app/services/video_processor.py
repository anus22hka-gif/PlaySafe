import cv2
from app.services.pose_extractor import extract_pose
from app.services.feature_engineer import extract_features

def process_video(video_path):
    cap = cv2.VideoCapture(video_path)
    all_features = []

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        pose = extract_pose(frame)
        if pose is not None:
            features = extract_features(pose)
            all_features.append(features)

    cap.release()
    return all_features
