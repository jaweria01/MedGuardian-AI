import speech_recognition as sr
import requests

# === CONFIG ===
AUDIO_FILES = ["fever_voice.wav", "ICU.wav"]
BACKEND_URL = "http://127.0.0.1:8000/submit-report"

# === SET DEFAULT VALUES (can be modified later) ===
DEFAULT_ISSUE_TYPE = "Medical Emergency"
DEFAULT_SERIOUSNESS = "Critical"

# === RECOGNIZER INSTANCE ===
recognizer = sr.Recognizer()

for file_name in AUDIO_FILES:
    print(f"\n🎧 Processing file: {file_name}")
    try:
        with sr.AudioFile(file_name) as source:
            audio = recognizer.record(source)
        text = recognizer.recognize_google(audio)
        print("✅ Transcribed Text:", text)

        payload = {
            "report": text,
            "issue_type": DEFAULT_ISSUE_TYPE,
            "seriousness": DEFAULT_SERIOUSNESS
        }

        response = requests.post(BACKEND_URL, json=payload)

        if response.status_code == 200:
            print("✅ Report submitted successfully!")
            print("📝 Response:", response.json())
        else:
            print("❌ Failed to submit report. Status:", response.status_code)
            print(response.text)

    except sr.UnknownValueError:
        print("❌ Could not understand the audio.")
    except sr.RequestError as e:
        print(f"❌ API Error: {e}")
    except Exception as e:
        print(f"❌ Unexpected Error: {e}")

