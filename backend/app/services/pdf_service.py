import fitz
from fastapi import HTTPException


def extract_text_from_pdf(file_path: str) -> str:
    """
    Extract all text from a PDF file.

    Args:
        file_path: Path to the uploaded PDF.

    Returns:
        Extracted text as a string.
    """

    try:
        document = fitz.open(file_path)

        extracted_text = ""

        for page in document:
            extracted_text += page.get_text()

        document.close()

        return extracted_text.strip()

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error extracting PDF text: {str(e)}"
        )