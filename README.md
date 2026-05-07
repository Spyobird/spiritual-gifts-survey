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

## Hosting & Deployment (Heroku)

This application is designed to be deployed to a free or hobby tier on Heroku. Heroku uses an Ubuntu-based environment.

### Configuration
The project includes a `Procfile` and `requirements.txt` (containing `gunicorn`) to handle production serving.

### Deployment Steps
1. **Install Heroku CLI** and log in:
   ```bash
   heroku login
   ```
2. **Create a new Heroku app**:
   ```bash
   heroku create
   ```
3. **Deploy the code**:
   ```bash
   git push heroku master
   ```

## Future Considerations (KIV)

Experimental hosting options are being considered, specifically the use of WASM or PyScript to enable hosting on static services such as GitHub Pages.

