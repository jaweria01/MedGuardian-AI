# main.py

from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel
from applications_med import check_and_escalate

app = FastAPI()

# Simple database simulation
reports_db = {}

class Report(BaseModel):
    report_id: str
    description: str
    severity: str  # "critical", "medium", "low"
    assigned_to: str  # example: "doctor", "maintenance"
    status: str  # "open", "pending", "resolved"

@app.post("/report/")
def submit_report(report: Report, background_tasks: BackgroundTasks):
    reports_db[report.report_id] = report
    if report.severity == "critical":
        # Schedule a check after 5 minutes
        background_tasks.add_task(check_and_escalate, report.report_id)
    return {"message": "Report submitted", "report_id": report.report_id}
