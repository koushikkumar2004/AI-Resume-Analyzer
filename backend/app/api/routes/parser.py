from fastapi import APIRouter, UploadFile, File
import os

from app.services.pdf_service import extract_text_from_pdf
from app.services.parser_service import ResumeParser

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

    return {
        "name": parser.extract_name(),
        "email": parser.extract_email(),
        "phone": parser.extract_phone(),
    }