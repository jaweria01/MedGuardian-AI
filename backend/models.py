from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Report(BaseModel):
    report: str
    issue_type: str
    seriousness: str
    status: Optional[str] = "Open"
    created_at: Optional[datetime] = datetime.utcnow()

