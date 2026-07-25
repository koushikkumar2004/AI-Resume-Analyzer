from fastapi import APIRouter, UploadFile, File, HTTPException
import os
import shutil

router = APIRouter()

UPLOAD_DIR = "app/uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    # Validate PDF
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "message": "Resume uploaded successfully",
        "filename": file.filename
    }