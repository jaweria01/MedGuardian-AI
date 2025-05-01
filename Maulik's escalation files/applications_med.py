
import time
import celery
from celery import Celery
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from main import reports_db  # Import your fake db

# Configure Celery
celery_app = Celery(
    "tasks",
    broker="redis://localhost:6379/0",  # Redis is needed for celery
)

SENDGRID_API_KEY = "YOUR_SENDGRID_API_KEY"
ALERT_EMAIL = "supervisor@example.com"  # Who should be alerted

@celery_app.task
def check_and_escalate(report_id):
    # Wait for 5 minutes
    time.sleep(300)

    report = reports_db.get(report_id)
    if report and report.status in ["open", "pending"]:
        # Still unresolved, escalate
        send_escalation_email(report)

def send_escalation_email(report):
    message = Mail(
        from_email='noreply@hospital.com',
        to_emails=ALERT_EMAIL,
        subject='🚨 Critical Issue Escalation Alert',
        html_content=f"""
            <strong>Attention!</strong><br><br>
            Critical issue not resolved in time:<br>
            <ul>
                <li><b>Description:</b> {report.description}</li>
                <li><b>Assigned To:</b> {report.assigned_to}</li>
                <li><b>Status:</b> {report.status}</li>
            </ul>
            Immediate action required!
        """
    )
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        sg.send(message)
        print("Escalation email sent successfully.")
    except Exception as e:
        print(f"Error sending escalation email: {e}")
