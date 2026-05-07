from src.scoring import calculate_scores

from src.scoring import calculate_scores

def test_calculate_scores_varied():
    # Response for question 1 (index 0) is 5
    # Response for question 2 (index 1) is 1
    # All others are 0
    responses = {str(i): 0 for i in range(80)}
    responses["0"] = 5
    responses["1"] = 1

    scores = calculate_scores(responses)

    # Administration uses [1, 17, 31, 47, 59]
    # In 0-indexing, question 1 is index 0.
    # So Administration should be 5 if the code is correct.
    # But current code looks for "1", which is index 1 (value 1).
    assert scores["Administration"] == 5, f"Expected 5, got {scores['Administration']}"

def test_calculate_scores_last_item():
    # Last question (index 79) is 5
    responses = {str(i): 0 for i in range(80)}
    responses["79"] = 5

    scores = calculate_scores(responses)

    # Faith uses [..., 80]
    # In 0-indexing, question 80 is index 79.
    assert scores["Faith"] == 5, f"Expected 5, got {scores['Faith']}"

