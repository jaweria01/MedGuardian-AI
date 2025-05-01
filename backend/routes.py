from fastapi import APIRouter
from models import Report
from database import report_collection

router = APIRouter()

# Endpoint to submit a new report
@router.post("/submit-report")
def submit_report(report: Report):
    try:
        data = report.dict()
        report_collection.insert_one(data)
        return {"message": "Report submitted successfully", "data": data}
    except Exception as e:
        print("Error inserting into MongoDB:", e)
        return {"message": "Failed to submit report", "error": str(e)}

# Endpoint to get all reports
@router.get("/all-reports")
def get_reports():
    try:
        reports = list(report_collection.find({}, {"_id": 0}))
        return reports
    except Exception as e:
        print("Error fetching reports:", e)
        return {"message": "Failed to fetch reports", "error": str(e)}

# Endpoint to update the status of a report
@router.put("/update-status/{report_text}")
def update_status(report_text: str, new_status: str):
    try:
        result = report_collection.update_one(
            {"report": report_text},
            {"$set": {"status": new_status}}
        )
        if result.modified_count:
            return {"message": "Status updated successfully"}
        return {"message": "Report not found"}
    except Exception as e:
        print("Error updating status:", e)
        return {"message": "Failed to update status", "error": str(e)}


