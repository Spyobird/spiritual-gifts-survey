# Spiritual Gifts Test

A web application designed to help members identify their spiritual gifts through a structured assessment.

## Quick Start (Localhost)

To get the application running locally as quickly as possible:

```bash
python -m venv venv
# macOS/Linux:
source venv/bin/activate
# Windows:
# venv\Scripts\activate

pip install -r requirements.txt
python src/app.py
```

The application will be available at [http://127.0.0.1:5000](http://127.0.0.1:5000).

## Local Development Setup

### Prerequisites
- Python 3.x

### Environment Configuration
It is recommended to use a virtual environment to keep dependencies isolated:
1. Create the environment: `python -m venv venv`
2. Activate the environment:
   - **macOS/Linux**: `source venv/bin/activate`
   - **Windows**: `venv\Scripts\activate`

### Server Mode
The application is configured with `debug=True` in `src/app.py`, which enables automatic reloading when code changes are detected.

