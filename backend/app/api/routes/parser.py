from fastapi import APIRouter, UploadFile, File, Form
import os

from app.services.pdf_service import extract_text_from_pdf
from app.services.parser_service import ResumeParser
from app.services.job_parser_service import JobDescriptionParser
from app.services.matching_service import ResumeJobMatcher
from app.services.ats_service import ATSScorer
from app.services.suggestion_service import ResumeSuggestionService 

router = APIRouter()


@router.post("/parse-resume")
async def parse_resume(file: UploadFile = File(...)):
    upload_dir = "app/uploads"
    os.makedirs(upload_dir, exist_ok=True)

    file_path = os.path.join(upload_dir, file.filename)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    text = extract_text_from_pdf(file_path)
    parser = ResumeParser(text)

    parsed_resume = parser.parse_resume()
    return parsed_resume

    return {
        "name": parser.extract_name(),
        "email": parser.extract_email(),
        "phone": parser.extract_phone(),
    }

@router.post("/analyze-resume")
async def analyze_resume(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    upload_dir = "app/uploads"
    os.makedirs(upload_dir, exist_ok=True)

    file_path = os.path.join(upload_dir, file.filename)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    text = extract_text_from_pdf(file_path)

    resume_parser = ResumeParser(text)
    resume_data = resume_parser.parse_resume()

    job_parser = JobDescriptionParser(job_description)
    required_skills = job_parser.extract_required_skills()

    matcher = ResumeJobMatcher()

    match_result = matcher.compare_skills(
        resume_data["skills"],
        required_skills
    )

    ats_scorer = ATSScorer()

    ats_score = ats_scorer.calculate_score(resume_data)
    suggestion_service = ResumeSuggestionService()

    suggestions = suggestion_service.generate_suggestions(
    resume_data,
    match_result["missing_skills"],
    ats_score
)

    return {
    "resume": resume_data,
    "required_skills": required_skills,
    "matched_skills": match_result["matched_skills"],
    "missing_skills": match_result["missing_skills"],
    "match_percentage": match_result["match_percentage"],
    "ats_score": ats_score,
    "suggestions": suggestions
}