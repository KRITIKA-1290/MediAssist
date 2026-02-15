# MediAssist

## Prerequisites
- Python 3.x
- Pip

## Installation

1. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application

### 1. Start Backend Server
Run the Flask backend server:
```bash
python backend/mediassist/main.py
```
The backend will start on `http://127.0.0.1:5000`.

### 2. Start Frontend
Serve the frontend files using Python's built-in HTTP server:
```bash
python -m http.server 8000
```
Then open your browser and navigate to:
[http://localhost:8000/frontend/html/index.html](http://localhost:8000/frontend/html/index.html)

### Notes
- Ensure both terminal windows stay open while running the app.
- The contact form communicates with the backend at `http://127.0.0.1:5000/send-email`.