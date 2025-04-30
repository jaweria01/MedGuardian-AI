import openai

# Step 1: Set your OpenAI API Key
openai.api_key = "YOUR_OPENAI_API_KEY"

# Step 2: Read the reports from a .txt file
def read_reports(file_path):
    with open(file_path, 'r') as file:
        reports = file.readlines()
    return [report.strip() for report in reports if report.strip()]

# Step 3: Send each report to GPT-4 for classification
def classify_report(report_text):
    prompt = f"""
You are a hospital report classification and routing assistant.
Given the following report, classify it into:

1. Type of Issue:
- Minor Issue
- Medical Emergency
- Safety Hazard
- Maintenance Issue
- Escalated Issue

2. Seriousness Level:
- Critical
- Medium
- Low

Also decide which team should be notified:
- Nurse
- Doctor
- Maintenance Staff
- Safety Supervisor
- Hospital Management

Report: "{report_text}"

Respond ONLY in the following JSON format:
{{
  "Issue Type": "...",
  "Seriousness Level": "...",
  "Team to Notify": "..."
}}
"""

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are an expert AI classification and routing assistant."},
            {"role": "user", "content": prompt}
        ],
        temperature=0
    )

    return response['choices'][0]['message']['content']

# Step 4: Process all reports
def main():
    reports = read_reports("sample_reports.txt")  # <-- Your txt file name here
    for idx, report in enumerate(reports, 1):
        print(f"\n--- Report {idx} ---")
        classification = classify_report(report)
        print(classification)

if __name__ == "__main__":
    main()
