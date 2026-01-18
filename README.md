Meeting Transcription & Summarization System 🎙️
A Full-Stack AI-powered application that automates meeting documentation. The system transcribes audio recordings, generates intelligent summaries, identifies participants, decisions, and action items, and allows exporting the results to a Word document.

Tech Stack 🛠️
Frontend: React.js (Axios for API communication).

Backend: Python (Flask).

AI Models:
Transcription: OpenAI Whisper (Running locally for cost-efficiency).
Analysis/LLM: Google Gemini 1.5 Flash (via Google AI Studio).
Utilities: FFmpeg (Audio processing), Python-Docx (Document generation).

Local Setup & Installation 🚀
Follow these steps to run the project locally on your machine.

1. Prerequisites
Ensure you have the following installed:

Python 3.8+
Node.js & npm

FFmpeg: (Crucial for audio processing)
Windows (via Chocolatey): choco install ffmpeg
Mac (via Homebrew): brew install ffmpeg
Linux: sudo apt install ffmpeg

2. Backend Configuration (Python)
Navigate to the backend directory.

Install the required Python libraries:

pip install flask flask-cors openai-whisper google-generativeai python-docx setuptools

Run the Flask server:

python app.py
The server will start at: http://127.0.0.1:5000

3. Frontend Configuration (React)
Open a new terminal and navigate to the frontend directory.

Install dependencies:

npm install

Start the application:
npm start
The app will open in your browser at: http://127.0.0.1:3000

Documentation 📄
PROCESS.md: Contains the full development log, AI-assistance examples, challenges faced, and time management.

System Prompt: A detailed explanation of the logic behind the LLM instructions is included within the PROCESS.md file (Section 4).

Key Features 💡
Local Transcription: Uses Whisper locally to avoid API costs and ensure privacy.

Smart Summary: Tailored for Hebrew meetings with structured outputs.

Export to Word: Seamlessly converts AI analysis into a professional .docx file.