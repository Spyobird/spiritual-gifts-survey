# Design Doc: Spiritual Gifts Assessment (Single-Page Experience)
**Date:** 2026-05-07

## Overview
A web application designed to help members identify their spiritual gifts through a structured 80-item assessment. The app uses a single-page interactive flow to ensure a seamless user experience.

## Architecture & Data Flow

### 1. Architecture Overview
We will use a **Hybrid Single-Page Architecture**.
* **Backend (Flask):** Acts as the "brain." It serves the initial page and provides a secure, reliable API endpoint for calculating the scores.
* **Frontend (HTML/Pico.css/Vanilla JS):** Acts as the "interface." A single HTML page will host the entire experience. JavaScript will handle the "app-like" behavior, such as switching between the survey and the results without refreshing the page.

### 2. Data Flow
The journey of a single assessment session will look like this:
1. **Initialization:** The user hits the root URL (`/`). Flask serves a single `index.html` file.
2. **The Survey Loop (Client-Side):**
    * JavaScript maintains an internal "state" (the current question being shown and the collection of answers provided so far).
    * As the user selects an answer, JavaScript updates a local `responses` object (e.g., `{ "1": 5, "2": 3, ... }`).
    * JavaScript updates a visual **Progress Bar** to give the user feedback.
3. **The Handover (Client $\rightarrow$ Server):**
    * When the user clicks "See My Results," JavaScript gathers all 80 answers and sends them to the Flask backend via a `POST` request to `/api/score` in JSON format.
4. **The Calculation (Server-Side):**
    * The Flask `ScoringEngine` receives the JSON.
    * It iterates through the answers and applies the specific math rules defined in `spiritual-gifts-survey.md`.
    * It returns a JSON object containing the final scores for all 16 gifts.
5. **The Reveal (Server $\rightarrow$ Client):**
    * JavaScript receives the scores from the server.
    * It instantly swaps the "Survey" view for the "Results" view.
    * It passes the scores to **Chart.js**, which draws the final bar graph on the screen.

### 3. High-Level Components
* **`SurveyView`**: Manages question display and the "next/previous" logic.
* **`ScoreAPI`**: The Flask endpoint that performs the heavy lifting of the math.
* **`ResultsView`**: The component that renders the final scores and the interactive chart.

## Component Details & Data Structures

### 1. Data Structures (The "Shape" of our data)
* **Question List (Client-side):** An array of objects containing the question text and its unique ID. This will be embedded in the initial HTML so the JavaScript can access it immediately.
    ```json
    [
      { "id": 1, "text": "I have the ability to organize ideas, resources, time, and people effectively." },
      ...
    ]
    ```
* **User Responses (Client-side State):** A simple dictionary that JavaScript updates as the user clicks through the survey.
    ```json
    { "1": 5, "2": 4, "3": 2, ... }
    ```
* **Scoring Map (Server-side Constant):** A dictionary in Python that defines which question IDs belong to which spiritual gift, based on the `spiritual-gifts-survey.md` file.
    ```python
    SCORING_MAP = {
        "Leadership": [6, 16, 27, 43, 65],
        "Administration": [1, 17, 31, 47, 59],
        ...
    }
    ```
* **API Response (Server $\rightarrow$ Client):** The JSON object sent back from Flask to the browser after the calculation is complete.
    ```json
    {
      "scores": {
        "Leadership": 22,
        "Administration": 15,
        ...
      }
    }
    ```

### 2. Component Details
#### **A. The `SurveyView` (The Engine)**
* **State:** `currentQuestionIndex` (0-79), `userAnswers` (object).
* **Methods:**
    * `renderQuestion()`: Clears the current view and populates it with the text of `questions[currentQuestionIndex]` and radio buttons (1-5).
    * `handleAnswer(value)`: Saves the value to `userAnswers` and increments `currentQuestionIndex` (or handles pagination).
    * `goToPrevious()`: Decrements `currentQuestionIndex` and re-renders.
* **UI Elements:** Question text, 5 radio buttons (styled by Pico.css), "Next" button, "Previous" button (if not on question 1), and a "Finish" button (on question 80).

#### **B. The `ProgressIndicator`**
* It will use the standard HTML `<progress>` element, which **Pico.css** will automatically style into a clean, modern bar.

#### **C. The `ResultsView` (The Reveal)**
* **Input:** `scores` object.
* **UI Elements:**
    * A header (e.g., "Your Spiritual Gifts Profile").
    * A `<canvas>` element for Chart.js.
    * A "Retake Survey" button.

#### **D. The `ScoringEngine` (The Python Logic)**
* **Input:** `responses` (dict).
* **Logic:**
    1. Initialize `gift_totals = { gift: 0 for gift in gifts }`.
    2. For each gift and its `item_ids`:
        `gift_totals[gift] = sum(responses.get(id, 0) for id in item_ids)`.
    3. Return `gift_totals`.

## Error Handling & Edge Cases

### 1. The "Incomplete Survey" Case
* **Problem:** A user might try to click "Finish" before answering all 80 questions.
* **Solution:** The "Finish" button will remain **disabled** (using HTML `disabled` attribute) until the `User Responses` object contains exactly 80 entries.

### 2. The "Network Failure" Case
* **Problem:** The user clicks "Submit," but the `fetch` call fails.
* **Solution:** The JavaScript `fetch` call will be wrapped in a `try/catch` block. If an error is caught, we will display a clear message: *"Connection lost. Please check your internet and try again."* A **"Retry"** button will be provided.

### 3. The "Server-Side Error" Case
* **Problem:** The server encounters an unexpected error during calculation.
* **Solution:** The Flask backend will return a `500 Internal Server Error` JSON response, which the frontend will catch and display as: *"We encountered an error calculating your results. Please try again."*

## Testing Strategy

### 1. Manual "Golden Path" Testing
* Ensure the full flow works: navigating through all 80 questions, using "Previous" and "Next," submitting, and verifying the chart renders correctly with expected values.

### 2. Automated Backend Testing (Unit Tests)
* Write Python `pytest` tests for the `ScoringEngine` to ensure math accuracy for various inputs (all 1s, all 5s, mixed values, etc.).

### 3. Component/UI Testing
* Manually verify that the `ProgressBar` and `SurveyView` react correctly to state changes and that no UI glitches occur during transitions.
