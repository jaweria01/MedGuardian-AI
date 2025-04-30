import requests
import json
import time
from tqdm import tqdm  # for progress bar

# Your Together.ai API Key
api_key = "813e787a26c72ce0155c9840f4fb802402ff5750e3336202c6f85b9206514dd9"  # <-- Replace with your API Key

# Model you want to use
model = "meta-llama/Llama-3-70b-chat-hf"

# API endpoint
url = "https://api.together.xyz/v1/chat/completions"

# Prepare headers
headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json",
}

# Step 1: Read reports from text file
with open('reports.txt', 'r', encoding='utf-8') as file:
    reports = file.readlines()

# Step 2: Open output file
output_file = open('classified_reports.txt', 'w', encoding='utf-8')

# Step 3: Process each report with Progress Bar
for idx, report in enumerate(tqdm(reports, desc="Classifying Reports")):
    report = report.strip()
    if not report:
        continue

    # 🔥 Optimized prompt for Llama-3
    prompt = f"""
You are a hospital incident classification assistant.

Given a hospital report, carefully classify it into:

1. **IssueType**: Choose one of the following exactly:
- Minor Issue
- Medical Emergency
- Safety Hazard
- Maintenance Issue
- Escalated Issue

2. **Seriousness Level**: Choose one of:
- Critical
- Medium
- Low

Return the output in valid JSON format like this:
{{
"IssueType": "...",
"Seriousness": "..."
}}

Report: '{report}'
"""

    data = {
        "model": model,
        "messages": [
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.3,
        "max_tokens": 512
    }

    success = False
    retry_count = 0
    max_retries = 3

    while not success and retry_count < max_retries:
        try:
            response = requests.post(url, headers=headers, json=data)

            if response.status_code == 200:
                result = response.json()
                reply = result['choices'][0]['message']['content']
                
                output_file.write(f"Report {idx+1}: {report}\n")
                output_file.write(f"Classification: {reply}\n")
                output_file.write("-" * 50 + "\n")
                success = True

                time.sleep(2)  # 💤 Slow down to avoid rate limits

            elif response.status_code == 429:
                retry_count += 1
                print(f"Rate limit for Report {idx+1}, retrying after 5 seconds... (Attempt {retry_count})")
                time.sleep(5)

            else:
                print(f"Error for Report {idx+1}: {response.status_code} {response.text}")
                output_file.write(f"Report {idx+1}: ERROR - {response.status_code}\n")
                output_file.write("-" * 50 + "\n")
                success = True  # exit loop even on error

        except Exception as e:
            print(f"Exception for Report {idx+1}: {str(e)}")
            output_file.write(f"Report {idx+1}: EXCEPTION - {str(e)}\n")
            output_file.write("-" * 50 + "\n")
            success = True  # exit loop even on exception

    if not success:
        print(f"Failed to classify Report {idx+1} after {max_retries} retries.")
        output_file.write(f"Report {idx+1}: FAILED AFTER {max_retries} RETRIES\n")
        output_file.write("-" * 50 + "\n")

# Step 4: Close output file
output_file.close()

print("\n✅ All reports processed and saved into 'classified_reports.txt'!")
