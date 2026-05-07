from src.scoring import calculate_scores

def test_calculate_scores_all_five():
    # If all 80 answers are 5, each gift (5 items) should be 25
    responses = {str(i): 5 for i in range(1, 81)}
    scores = calculate_scores(responses)
    assert scores["Leadership"] == 25
    assert scores["Administration"] == 25

def test_calculate_scores_all_one():
    responses = {str(i): 1 for i in range(1, 81)}
    scores = calculate_scores(responses)
    assert scores["Leadership"] == 5
    assert scores["Administration"] == 5
