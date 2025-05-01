import speech_recognition as sr

r = sr.Recognizer()

with sr.Microphone() as source:
    print("Please address your health issues:")
    audio = r.listen(source)

    try:
        text = r.recognize_google(audio)
        print("You said: " + text)

    except sr.UnknownValueError:
        print("Sorry, I could not understand the audio.")
    except sr.RequestError as e:
        print(f"Could not request results; {e}")
    except Exception as e:
        print(f"An error occurred: {e} Please contact the hospital for assistance immediately.")