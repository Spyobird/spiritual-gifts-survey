import pytest
from flask import json
from src.app import create_app

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_score_api_success(client):
    payload = {str(i): 5 for i in range(1, 81)}
    response = client.post('/api/score',
                           data=json.dumps(payload),
                           content_type='application/json')
    assert response.status_code == 200
    data = response.get_json()
    assert data['scores']['Leadership'] == 25
