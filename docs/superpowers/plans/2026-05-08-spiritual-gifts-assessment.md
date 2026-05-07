# Spiritual Gifts Assessment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page interactive spiritual gifts assessment using Flask and Pico.css.

**Architecture:** Single-page application (SPA) with a Flask backend providing a scoring API. JavaScript manages UI state and transitions.

**Tech Stack:** Python (Flask), JavaScript (Vanilla), HTML, Pico.css, Chart.js, pytest.

---

### Task 1: Project Setup

**Files:**
- Create: `requirements.txt`
- Create: `src/app.py`
- Create: `src/scoring.py`
- Create: `src/templates/index.html`
- Create: `src/static/js/app.js`
- Create: `tests/test_scoring.py`

- [ ] **Step 1: Create requirements.txt**

```text
flask
pytest
```

- [ ] **Step 2: Create directory structure**

```bash
mkdir -p src/templates src/static/js src/static/css tests
```

- [ ] **Step 3: Commit setup**

```bash
git add requirements.txt src/ docs/
git commit -m "chore: project setup"
```

### Task 2: Scoring Engine (TDD)

**Files:**
- Create: `src/scoring.py`
- Test: `tests/test_scoring.py`

- [ ] **Step 1: Write the failing test**

```python
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pytest tests/test_scoring.py -v`
Expected: FAIL (ImportError or NameError)

- [ ] **Step 3: Write minimal implementation**

```python
# src/scoring.py

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
        scores[gift] = sum(int(responses.get(str(item_id), 0)) for item_id in item_ids)
    return scores
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pytest tests/test_scoring.py -v`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/scoring.py tests/test_scoring.py
git commit -m "feat: implement scoring engine"
```

### Task 3: API Endpoint (TDD)

**Files:**
- Modify: `src/app.py`
- Test: `tests/test_api.py`

- [ ] **Step 1: Write the failing test**

```python
from flask import Flask, json
from werkzeug.test import test_client
from src.app import create_app
from src.scoring import calculate_scores

def test_score_api_success(client):
    payload = {str(i): 5 for i in range(1, 81)}
    response = client.post('/api/score', 
                           data=json.dumps(payload),
                           content_type='application/json')
    assert response.status_code == 200
    data = response.get_json()
    assert data['scores']['Leadership'] == 25
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pytest tests/test_api.py -v`
Expected: FAIL

- [ ] **Step 3: Write minimal implementation**

```python
# src/app.py
from flask import Flask, render_template, request, jsonify
from src.scoring import calculate_scores

def create_app():
    app = Flask(__name__, template_folder='templates', static_folder='static')

    @app.route('/')
    def index():
        return render_template('index.html')

    @app.route('/api/score', methods=['POST'])
    def score():
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400
        scores = calculate_scores(data)
        return jsonify({"scores": scores})

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pytest tests/test_api.py -v`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app.py tests/test_api.py
git commit -m "feat: add scoring API endpoint"
```

### Task 4: Frontend Base (HTML/Pico.css)

**Files:**
- Create: `src/templates/index.html`

- [ ] **Step 1: Create basic HTML with Pico.css**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spiritual Gifts Assessment</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <main class="container">
        <hgroup>
            <h1>Spiritual Gifts Assessment</h1>
            <h2>Discover your unique calling</h2>
        </hgroup>

        <div id="app">
            <!-- Survey and Results will be injected here -->
            <p>Loading assessment...</p>
        </div>
    </main>
    <script src="/static/js/app.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create empty app.js**

```javascript
// src/static/js/app.js
console.log("App initialized");
```

- [ ] **Step 3: Run and verify**

Run: `python src/app.py`
Expected: Page loads with "Loading assessment..."

- [ ] **Step 4: Commit**

```bash
git add src/templates/index.html src/static/js/app.js
git commit -m "feat: setup basic frontend structure"
```

### Task 5: Survey Logic (JS)

**Files:**
- Modify: `src/templates/index.html`
- Modify: `src/static/js/app.js`

- [ ] **Step 1: Embed Question Data in HTML**

```html
<!-- Inside index.html, before the script tag -->
<script id="questions-data" type="application/json">
[
  {"id": 1, "text": "I have the ability to organize ideas, resources, time, and people effectively."},
  {"id": 2, "text": "I am willing to study and prepare for the task of teaching."},
  ... (all 80 questions)
]
</script>
```

- [ ] **Step 2: Implement Survey Engine in JS**

```javascript
// src/static/js/app.js
// 1. Load questions from script tag
// 2. Manage state: currentQuestionIndex, responses
// 3. renderQuestion(): update DOM with question text and radio buttons
// 4. handleAnswer(): save answer and move to next/prev
// 5. updateProgressBar()
```

- [ ] **Step 3: Commit**

```bash
git add src/templates/index.html src/static/js/app.js
git commit -m "feat: implement survey logic"
```

### Task 6: Submission & Results (JS/Chart.js)

**Files:**
- Modify: `src/static/js/app.js`

- [ ] **Step 1: Implement Submission Logic**

```javascript
// src/static/js/app.js
// 1. On "Finish" click: fetch('/api/score', { method: 'POST', body: JSON.stringify(responses) })
// 2. On success: transition to ResultsView
// 3. On error: show error message
```

- [ ] **Step 2: Implement ResultsView & Chart.js**

```javascript
// src/static/js/app.js
// 1. renderResults(scores):
//    - Clear #app
//    - Create <canvas id="resultsChart"></canvas>
//    - Initialize new Chart(ctx, { type: 'bar', data: { ... } })
```

- [ ] **Step 3: Commit**

```bash
git add src/static/js/app.js
git commit -m "feat: implement submission and results display"
```
