# Sorted Horizontal Results Chart Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the spiritual gifts results chart to a sorted horizontal bar chart to improve readability on all devices.

**Architecture:** Modify the `renderResults` function in `src/static/js/app.js` to sort result data and update Chart.js configuration for horizontal orientation and improved layout.

**Tech Stack:** Vanilla JS, Chart.js, Playwright (for verification).

---

### Task 1: Implement Sorted Horizontal Chart

**Files:**
- Modify: `src/static/js/app.js`

- [ ] **Step 1: Update `renderResults` to sort scores and update layout container**

Modify `renderResults` (around line 221):
Replace the HTML container `div` with `min-height: 80vh`.
Implement sorting logic.

```javascript
    function renderResults(data) {
        document.getElementById('view-results').innerHTML = `
            <div class="results-container">
                <h3>Your Spiritual Gifts Profile</h3>
                <p>Below are the scores for each of the 16 spiritual gifts. Higher scores indicate a stronger alignment with that gift.</p>
                <div style="position: relative; min-height:80vh; width:100%">
                    <canvas id="resultsChart"></canvas>
                </div>
                <div class="navigation">
                    <button id="view-info-btn">View Gift Descriptions</button>
                    <button id="restart-btn" class="outline">Restart Survey</button>
                </div>
            </div>
        `;

        const ctx = document.getElementById('resultsChart').getContext('2d');

        // Sort scores descending
        const sortedEntries = Object.entries(data.scores).sort((a, b) => b[1] - a[1]);
        const labels = sortedEntries.map(entry => entry[0]);
        const values = sortedEntries.map(entry => entry[1]);
```

- [ ] **Step 2: Update Chart.js configuration for horizontal orientation**

Update the `new Chart` call in `renderResults`:

```javascript
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Score',
                    data: values,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 25,
                        title: {
                            display: true,
                            text: 'Score (0-25)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Spiritual Gifts'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
```

- [ ] **Step 3: Verify implementation manually**
1. Start server.
2. Complete survey.
3. Verify:
    - Chart is horizontal (bars grow left-to-right).
    - Highest score is at the top.
    - Axis titles are correct.
    - Height is sufficient on mobile.

- [ ] **Step 4: Run Playwright test to verify no regressions**

Run: `export PYTHONPATH=. && venv/bin/pytest tests/e2e/test_results_chart.py`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/static/js/app.js
git commit -m "feat: implement sorted horizontal results chart for better mobile readability"
```
