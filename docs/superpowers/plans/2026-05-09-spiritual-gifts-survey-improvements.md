# Spiritual Gifts Survey Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a multi-view SPA flow (Directions $\rightarrow$ Survey $\rightarrow$ Results $\leftrightarrow$ Info) with updated response labels, a dedicated gift information page, and a full state reset capability.

**Architecture:** Shift from simple `innerHTML` replacement to a view-state manager using a `currentView` variable and a `switchView()` function to toggle visibility of view containers.

**Tech Stack:** Vanilla JavaScript, HTML, Pico.css, Chart.js.

---

## File Structure

- **Modify**: `src/templates/index.html`
    - Add containers for `view-directions`, `view-survey`, `view-results`, and `view-info`.
- **Modify**: `src/static/js/app.js`
    - Implement `currentView` state and `switchView()` logic.
    - Update `renderQuestion()` to target the survey container.
    - Implement `renderInfo()` to display gift definitions.
    - Implement `restartQuiz()` for a clean state reset.
    - Update response labels in the survey UI.
    - Add navigation buttons to the Results and Info views.

---

## Tasks

### Task 1: Implement View Management Core

**Files:**
- Modify: `src/templates/index.html`
- Modify: `src/static/js/app.js`

- [ ] **Step 1: Add view containers to HTML**
  Wrap the current `#app` content or replace it with four distinct sections:
  ```html
  <div id="app">
      <section id="view-directions" style="display: none;"></section>
      <section id="view-survey" style="display: none;"></section>
      <section id="view-results" style="display: none;"></section>
      <section id="view-info" style="display: none;"></section>
  </div>
  ```

- [ ] **Step 2: Implement `switchView` in JS**
  Add a `currentView` variable and the `switchView` function:
  ```javascript
  let currentView = 'directions';
  function switchView(viewName) {
      currentView = viewName;
      const views = ['directions', 'survey', 'results', 'info'];
      views.forEach(v => {
          document.getElementById(`view-${v}`).style.display = v === viewName ? 'block' : 'none';
      });
  }
  ```

- [ ] **Step 3: Initialize to Directions view**
  Update the `DOMContentLoaded` listener to call `switchView('directions')` and initialize the Directions view.

- [ ] **Step 4: Commit**
  `git add src/templates/index.html src/static/js/app.js && git commit -m "feat: implement basic view management system"`

### Task 2: Implement Directions View

**Files:**
- Modify: `src/static/js/app.js`

- [ ] **Step 1: Create `renderDirections()` function**
  Implement the approved copy:
  ```javascript
  function renderDirections() {
      const container = document.getElementById('view-directions');
      container.innerHTML = `
          <div class="directions-container">
              <h3>Welcome to the Spiritual Gifts Survey</h3>
              <p>This is a tool for self-discovery, not a test—there are no right or wrong answers. The survey consists of 80 statements—some reflect concrete actions, some are descriptive traits, and others are statements of belief.</p>
              <p><strong>To get the most accurate results:</strong></p>
              <ul>
                  <li><strong>Be honest with yourself.</strong> Select the response that you feel best characterizes you.</li>
                  <li><strong>Trust your first instinct.</strong> Don't spend too much time on any one item. Usually, your immediate response is best.</li>
                  <li><strong>Work independently.</strong> To ensure the results reflect your own gifts, do not ask others how they are answering or how they think you should answer.</li>
                  <li><strong>Go at your own pace.</strong> Take the time you need, but try not to overthink the questions.</li>
              </ul>
              <button id="start-survey-btn">Start Survey</button>
          </div>
      `;
      document.getElementById('start-survey-btn').addEventListener('click', () => {
          switchView('survey');
          renderQuestion();
      });
  }
  ```

- [ ] **Step 2: Integrate into `DOMContentLoaded`**
  Call `renderDirections()` before `switchView('directions')`.

- [ ] **Step 3: Commit**
  `git commit -m "feat: add directions view with approved copy"`

### Task 3: Update Survey View and Labels

**Files:**
- Modify: `src/static/js/app.js`

- [ ] **Step 1: Update `renderQuestion()` to target `view-survey`**
  Change `appContainer.innerHTML = ...` to `document.getElementById('view-survey').innerHTML = ...`.

- [ ] **Step 2: Update response labels**
  Replace "Strongly Disagree" etc. with "Balanced & Descriptive" labels:
  - 5: Definitely true for me
  - 4: Most of the time true
  - 3: Sometimes true (about 50%)
  - 2: Occasionally true (about 25%)
  - 1: Not at all true for me

- [ ] **Step 3: Commit**
  `git commit -m "feat: update survey view labels and container"`

### Task 4: Implement Information View

**Files:**
- Modify: `src/static/js/app.js`

- [ ] **Step 1: Define the gift descriptions data**
  Create a constant `GIFT_DESCRIPTIONS` object containing the definitions from `references/spiritual-gifts-list.md`.

- [ ] **Step 2: Create `renderInfo()` function**
  Build the HTML list of gifts and descriptions:
  ```javascript
  function renderInfo() {
      const container = document.getElementById('view-info');
      let html = `<h3>Understanding Your Gifts</h3><div class="gift-list">`;
      for (const [gift, desc] of Object.entries(GIFT_DESCRIPTIONS)) {
          html += `<div class="gift-item"><strong>${gift}</strong>: ${desc}</div>`;
      }
      html += `</div><div class="navigation"><button id="back-to-results-btn">Back to Results</button></div>`;
      container.innerHTML = html;
      document.getElementById('back-to-results-btn').addEventListener('click', () => switchView('results'));
  }
  ```

- [ ] **Step 3: Commit**
  `git commit -m "feat: add spiritual gifts information view"`

### Task 5: Update Results View and Restart Logic

**Files:**
- Modify: `src/static/js/app.js`

- [ ] **Step 1: Update `renderResults()` to target `view-results`**
  Change `appContainer.innerHTML = ...` to `document.getElementById('view-results').innerHTML = ...`.

- [ ] **Step 2: Add navigation buttons to Results**
  Update the `navigation` div to include:
  - `<button id="view-info-btn">View Gift Descriptions</button>` $\rightarrow$ `switchView('info'); renderInfo();`
  - `<button id="restart-btn" class="outline">Restart Survey</button>` $\rightarrow$ `restartQuiz();`

- [ ] **Step 3: Implement `restartQuiz()` function**
  ```javascript
  function restartQuiz() {
      responses = {}; // Clear answers
      currentQuestionIndex = 0; // Reset index
      // Any other cached scores should be cleared here
      switchView('directions');
  }
  ```
  *Note: Since `responses` is declared with `const` in current code, it must be changed to `let` in Task 1/3.*

- [ ] **Step 4: Commit**
  `git commit -m "feat: add results navigation and restart logic"`

### Task 6: Final Integration and Testing

- [ ] **Step 1: Verify Flow**
  1. Load app $\rightarrow$ Directions Page.
  2. Start $\rightarrow$ Survey (Check labels).
  3. Finish $\rightarrow$ Results (Check chart).
  4. View Info $\rightarrow$ Info Page (Check descriptions).
  5. Back $\rightarrow$ Results Page.
  6. Restart $\rightarrow$ Directions Page (Verify state is clean).

- [ ] **Step 2: Final Commit**
  `git commit -m "chore: final integration and verification of survey improvements"`
