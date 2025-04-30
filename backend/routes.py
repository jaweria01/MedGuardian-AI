from fastapi import APIRouter
from models import Report
from fastapi import APIRouter
from models import Report
from database import report_collection

router = APIRouter()

@router.post("/submit-report")
def submit_report(report: Report):
    data = report.dict()
    report_collection.insert_one(data)
    return {"message": "Report submitted successfully", "data": data}

@router.get("/all-reports")
def get_reports():
    return list(report_collection.find({}, {"_id": 0}))

@router.put("/update-status/{report_text}")
def update_status(report_text: str, new_status: str):
    result = report_collection.update_one(
        {"report": report_text},
        {"$set": {"status": new_status}}
    )
    if result.modified_count:
        return {"message": "Status updated"}
    return {"message": "Report not found"}


