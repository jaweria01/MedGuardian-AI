from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router  # this is your routes file

app = FastAPI(title="MedGuardian AI - Backend")

# Allow frontend access (React, etc.)
origins = [
    "http://localhost:3000",         # Local frontend dev server
    "http://127.0.0.1:8000",
    "https://9474-154-81-244-121.ngrok-free.app",  # (optional) ngrok if deployed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # only allow trusted origins
    allow_credentials=True,
    allow_methods=["*"],            # allow POST, GET, PUT, etc.
    allow_headers=["*"],            # allow all headers
)

# Include your routes
app.include_router(router)
