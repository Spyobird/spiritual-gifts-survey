---
name: User Setup and Hosting Guide
description: Design for the README.md setup and deployment instructions for the Spiritual Gifts Test application.
type: specification
---

# User Setup and Hosting Guide Design

## Overview
The goal is to provide a simple, cross-platform, professional-grade setup and hosting guide for the lead developer and generic administrators. The final output will be a `README.md` file in the project root.

## Structure

### 1. Project Title & Description
- A concise heading and a 1-2 sentence description of the Spiritual Gifts Test application.

### 2. Quick Start (Localhost)
A condensed section for rapid deployment on a local machine.
- **Commands**:
    - `python -m venv venv`
    - Activation command (macOS/Linux and Windows)
    - `pip install -r requirements.txt`
    - `python src/app.py`
- **Access**: Explicit mention of `http://127.0.0.1:5000`.

### 3. Local Development Setup
Detailed prerequisites and environment configuration.
- **Prerequisites**: Python 3.x.
- **Environment**: Detailed explanation of virtual environment usage.
- **Server Mode**: Note on `debug=True` in `app.py` for automatic reloading during development.

### 4. Hosting & Deployment (Heroku)
A step-by-step guide to deploying the application to a free/hobby tier on Heroku.
- **Required Configuration**:
    - Update `requirements.txt` to include `gunicorn`.
    - Create a `Procfile` in the root: `web: gunicorn src.app:create_app()`.
- **Deployment Workflow**:
    - `heroku login`
    - `heroku create`
    - `git push heroku master`
- **Environment Note**: Mention the Ubuntu-based execution environment.

### 5. Future Considerations (KIV)
- A brief note regarding experimental hosting options, specifically the use of WASM/PyScript to enable hosting on static services like GitHub Pages.
