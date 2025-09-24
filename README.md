
# 🏥 MedGuardian AI

### 🎯 Your Smart Hospital Safety & Incident Response Assistant  
> Built during the [AI Genesis Hackathon by Lablab.ai](https://lablab.ai/) — solving real-time hospital issues using AI agents and automation.

---

## 🌟 What is MedGuardian AI?

MedGuardian AI is a voice & text-based hospital assistant that allows **anyone** — patients, nurses, doctors, or visitors — to report safety hazards, medical emergencies, or maintenance issues.

The system uses **AI agents** to:
- Understand reports via voice/text input
- Classify them by **severity** and **type**
- **Alert the right staff** in real time
- **Escalate critical issues** automatically if not addressed
- Store and **visualize reports** for admin tracking

---

## 💡 Why This Project?

### 🔥 Real-Time Industry Need:
Hospitals are crowded, chaotic, and manually dependent. Our solution:
- Prevents delayed responses
- Avoids disasters
- Boosts hospital safety & trust

### 🤖 Our Unique Edge:
- Uses **Claude/GPT-4** to understand natural language
- Voice-powered with **Whisper API**
- Built with **FastAPI**, **MongoDB**, and **Streamlit**
- Modular, scalable & hackathon-ready

---

## 🧠 How It Works

### 👤 Who Can Use It:
| User       | What They Can Do                        |
|------------|------------------------------------------|
| Nurse      | Report patient issues, receive alerts    |
| Doctor     | Get urgent medical notifications         |
| Patient    | Speak/type symptoms or complaints        |
| Visitor    | Report safety hazards in public areas    |
| Supervisor | Get notified if issues are escalated     |

---

### ⚙️ AI Workflow

1. **Input** — Users report via voice or text
2. **AI Classification** — GPT/Claude classifies:
   - `Medical Emergency`
   - `Safety Hazard`
   - `Maintenance`
   - `Minor Issue`
3. **Severity Level** — AI rates each: `Critical`, `Medium`, `Low`
4. **Routing** — Sends alerts to the relevant department/team
5. **Escalation** — If ignored, alerts supervisor after 5 minutes
6. **Admin Dashboard** — View reports, filter, search & download

---

## 📁 Folder Structure

```
MedGuardianAI/
│
├── backend/                   # FastAPI + MongoDB backend
│   ├── main.py
│   ├── models.py
│   ├── routes.py
│   ├── database.py
│   └── .env
│
├── ai_classification/        # Claude classification system
│   ├── reports.txt
│   ├── classified_reports.txt
│   ├── batch_classify_reports.py
│   ├── together_client.py
│   └── routing_classifier.py
│
├── streamlit_dashboard/      # Admin dashboard for reports
│   └── admin_dashboard.py
│
└── README.md
```

---

## 🚀 How to Run

### 🛠️ Backend (FastAPI)

```bash
cd backend/
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```
➡ Open [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) to use API

---

### 🤖 AI Classification

```bash
cd ai_classification/
python batch_classify_reports.py
```

---

### 📊 Admin Dashboard (Streamlit)

```bash
cd streamlit_dashboard/
streamlit run admin_dashboard.py
```

---

## 🔧 Tech Stack

| Tool        | Purpose                       |
|-------------|-------------------------------|
| GPT-4/Claude | Natural Language Understanding |
| Whisper API | Voice-to-text from patients    |
| FastAPI     | API backend                    |
| MongoDB     | Report storage (NoSQL)         |
| Streamlit   | Admin dashboard & filters      |
| Together.ai | Claude API integration         |

---

## 🏆 Team MedGuardians

| Name                      | Role                          |
|--------------             |-------------------------------|
| Muhammad Umar             | Frontend Developer            |
| Jaweria Siddique (Leader) | AI Classification Engineer    |
| Muhammad Faisal           | Voice-to-Text Whisper Engineer|
| Aayush Pathak             | Backend Developer (API/DB)    |
| Maulik Shah               |  Alert and Escalation Engineer|
| Bharti Pal                | Dashboard Developer           |

---

## 🚀 Live Demo
[Click here to try the project](https://hackathon-project-hrhb.vercel.app/)

---
## 🎯 Impact

✅ 10x faster response to emergencies  
✅ Increased hospital safety tracking  
✅ Scalable solution for healthcare industries  
✅ Fully modular & demo-ready

---

## 📬 Contact & Collaboration

> Built with ❤️ for AI Genesis Hackathon.  
We’re open to collaboration, improvements, and deployments in real-world hospital environments.

---

**⭐ Give us a star if you liked it!**
