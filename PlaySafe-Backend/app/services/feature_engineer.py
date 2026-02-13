import numpy as np

def joint_angle(a, b, c):
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)

    ba = a - b
    bc = c - b

    cosine = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc))
    angle = np.degrees(np.arccos(cosine))
    return angle

def extract_features(landmarks):
    features = {}

    # Example: knee angle
    hip = landmarks[23]
    knee = landmarks[25]
    ankle = landmarks[27]

    features["left_knee_angle"] = joint_angle(hip, knee, ankle)

    return features
