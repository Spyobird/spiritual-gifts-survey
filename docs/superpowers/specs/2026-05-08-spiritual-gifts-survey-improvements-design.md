# Design Spec: Spiritual Gifts Survey Improvements
Date: 2026-05-08

## Goal
Improve the user experience (UX) of the Spiritual Gifts Test by adding introductory directions, refining response choices, providing a dedicated information page for gift definitions, and implementing a survey restart capability.

## User Flow
The application will follow a linear flow with a bidirectional relationship between results and information:
`Directions View` $\rightarrow$ `Survey View` $\rightarrow$ `Results View` $\leftrightarrow$ `Information View`

A "Restart" action on the Results page will return the user to the `Directions View`.

## Architecture

### View Management
The application remains a Single-Page Application (SPA). We will implement a view-state manager to handle transitions without page reloads.

- **State**: A `currentView` variable will track the active state (`directions`, `survey`, `results`, `info`).
- **Logic**: A `switchView(viewName)` function will:
    - Identify all view containers (marked as sections in the HTML).
    - Hide all containers using `display: none`.
    - Show the target container using `display: block` (or the appropriate Pico.css layout).

### State Reset
A `restartQuiz()` function will be implemented to ensure a "clean state" upon restarting:
1.  **Clear Answers**: Wipe the `userAnswers` array.
2.  **Reset Index**: Set the current question tracker to 0.
3.  **Clear Scores**: Reset any cached score totals.
4.  **View Transition**: Call `switchView('directions')`.

## Component Breakdown

### 1. Directions View (New)
- **Purpose**: Provide context and guidance before the survey begins.
- **Content**:
    - Title: "Welcome to the Spiritual Gifts Survey"
    - Body: Friendly and encouraging copy emphasizing self-discovery, not testing.
    - Key guidance: Trust instincts, work independently, and go at your own pace.
- **Action**: "Start Survey" button $\rightarrow$ `switchView('survey')`.

### 2. Survey View (Updated)
- **Purpose**: Collect user responses to the 80 survey items.
- **Update**: Update 1-5 response labels to "Balanced & Descriptive" versions:
    - **5**: Definitely true for me
    - **4**: Most of the time true
    - **3**: Sometimes true (about 50%)
    - **2**: Occasionally true (about 25%)
    - **1**: Not at all true for me

### 3. Results View (Updated)
- **Purpose**: Display the user's spiritual gift profile via a chart.
- **Additions**:
    - **Info Button**: "View Gift Descriptions" $\rightarrow$ `switchView('info')`.
    - **Reset Button**: "Restart Survey" $\rightarrow$ `restartQuiz()`.

### 4. Information View (New)
- **Purpose**: Provide definitions and descriptions for each spiritual gift.
- **Content**: Structured list of gifts and descriptions sourced from `references/spiritual-gifts-list.md`.
- **Layout**: Optimized for mobile scannability using Pico.css.
- **Action**: "Back to Results" button $\rightarrow$ `switchView('results')`.

## Data Flow

1.  **Input**: Responses are stored in a `userAnswers` array.
2.  **Calculation**: Upon completion, the app sums the responses for each gift based on the scoring mapping in `references/spiritual-gifts-survey.md`.
3.  **Visualization**: Totals are passed to Chart.js to render the results.
4.  **Reset**: The `restartQuiz()` function clears all stored data before returning to the start.

## Constraints & Guidelines
- **Styling**: Use Pico.css for a minimal, clean aesthetic.
- **Mobile First**: Prioritize a seamless experience on mobile devices (especially for the Info page).
- **UX**: Maintain a low-friction SPA experience with minimal page jumps.
