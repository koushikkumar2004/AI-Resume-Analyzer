# AI Resume Analyzer

An AI-powered full-stack application that analyzes resumes against job descriptions and provides ATS scores, skill matching, missing skills, and resume improvement suggestions.

---

## 🚀 Features

- PDF resume upload
- PDF text extraction
- Resume information extraction
- Email extraction
- Phone number extraction
- Name extraction
- Skills extraction
- Education extraction
- Job description analysis
- Resume vs job skill matching
- ATS score calculation
- Job match percentage
- Missing skill detection
- Skill-specific recommendations
- Resume improvement suggestions
- Downloadable PDF analysis report

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Axios
- jsPDF

### Backend

- Python
- FastAPI
- PyMuPDF
- Uvicorn

---

## 📁 Project Structure

```text
AI-Resume-Analyzer/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── database/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── uploads/
│   │   └── main.py
│   │
│   ├── tests/
│   ├── venv/
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── public/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md