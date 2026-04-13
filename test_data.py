import requests
import random

# Your Django API endpoint
url = "http://127.0.0.1:8000/api/logs/"

def add_log():
    payload = {
        "ai_model": f"{random.randint(10, 99)}", # Random Model ID
        "latency_ms": random.randint(100, 800),  # Random Latency
        "status": random.choice(["Success", "Failure"]) # Random Status
    }

    try:
        response = requests.post(url, json=payload)
        if response.status_code == 201:
            print(f"✅ Success: Added Model {payload['ai_model']}")
        else:
            print(f"❌ Failed: {response.status_code}")
    except Exception as e:
        print(f"Error: {e}")

# Add 5 new rows of data
for _ in range(5):
    add_log()