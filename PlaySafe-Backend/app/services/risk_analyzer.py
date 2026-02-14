def analyze_tactics(metrics):

    width = metrics["width"]
    depth = metrics["depth"]
    compactness = metrics["compactness"]

    if width > 600 and depth > 400:
        formation = "4-3-3"
        goal_probability = 0.68
    elif width > 400:
        formation = "4-4-2"
        goal_probability = 0.55
    else:
        formation = "Defensive Block"
        goal_probability = 0.35

    tactical_score = min(compactness / 100000, 1)

    return {
        "formation": formation,
        "goal_probability": goal_probability,
        "tactical_score": tactical_score
    }
