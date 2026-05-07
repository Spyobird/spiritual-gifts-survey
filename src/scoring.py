SCORING_MAP = {
    "Leadership": [6, 16, 27, 43, 65],
    "Administration": [1, 17, 31, 47, 59],
    "Teaching": [2, 18, 33, 61, 73],
    "Knowledge": [9, 24, 39, 68, 79],
    "Wisdom": [3, 19, 48, 62, 74],
    "Prophecy": [10, 25, 40, 54, 69],
    "Discernment": [11, 26, 41, 55, 70],
    "Exhortation": [20, 34, 49, 63, 75],
    "Shepherding": [4, 21, 35, 50, 76],
    "Faith": [12, 28, 42, 56, 80],
    "Evangelism": [5, 36, 51, 64, 77],
    "Apostleship": [13, 29, 44, 57, 71],
    "Service/Helps": [14, 30, 46, 58, 72],
    "Mercy": [7, 22, 37, 52, 66],
    "Giving": [8, 23, 38, 53, 67],
    "Hospitality": [15, 32, 45, 60, 78]
}

def calculate_scores(responses):
    scores = {}
    for gift, item_ids in SCORING_MAP.items():
        scores[gift] = sum(int(responses.get(str(item_id - 1), 0)) for item_id in item_ids)
    return scores
