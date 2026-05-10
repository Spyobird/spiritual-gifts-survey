---
name: Sorted Horizontal Results Chart
description: Update the spiritual gifts results chart to a sorted horizontal bar chart to improve readability across all devices, especially mobile.
type: spec
---

# Sorted Horizontal Results Chart Design

## Goal
Improve the readability and UX of the spiritual gifts results chart. The current vertical bar chart becomes cramped on mobile devices with 16 categories, making labels difficult to read.

## Proposed Changes

### 1. Data Preparation
Instead of passing the `data.scores` object directly to the chart, the application will:
- Convert the `scores` object into an array of `[gift, score]` pairs.
- Sort this array in descending order based on the score.
- Extract the sorted keys as `labels` and sorted values as `data` for Chart.js.

This ensures that the user's most prominent gifts are displayed at the top of the chart.

### 2. Chart Configuration
The Chart.js configuration will be updated as follows:
- **Axis Orientation**: Set `indexAxis: 'y'` to change the chart from vertical to horizontal.
- **X-Axis (Value Axis)**:
    - Title: "Score (0-25)"
    - `beginAtZero: true`
    - `max: 25`
- **Y-Axis (Category Axis)**:
    - Title: "Spiritual Gifts"
- **Responsiveness**: Keep `maintainAspectRatio: false` to allow the chart to fill its container.

### 3. Layout Adjustments
To prevent the 16 bars from becoming too thin on small screens, the container `div` will be updated:
- Change `height: 60vh` to `min-height: 80vh`.
- Ensure the container allows for vertical expansion to maintain bar legibility.

## Success Criteria
- Labels for all 16 gifts are clearly legible on mobile devices.
- Bars are sorted from highest to lowest score.
- The chart layout is consistent and readable across both desktop and mobile viewports.
