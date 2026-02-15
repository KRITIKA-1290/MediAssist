
import requests
import json

url = "http://127.0.0.1:5000/signup"
data = {
    "username": "testuser123",
    "email": "testuser123@example.com",
    "password": "password123"
}

try:
    response = requests.post(url, json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
except requests.exceptions.ConnectionError:
    print("Failed to connect to backend.")
except Exception as e:
    print(f"Error: {e}")
