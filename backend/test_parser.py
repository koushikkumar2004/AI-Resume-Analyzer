from app.services.parser_service import ResumeParser

sample_text = """
John Doe
Email: john.doe@email.com
Phone: +91 9876543210
"""

parser = ResumeParser(sample_text)

print("Email:", parser.extract_email())
print("Phone:", parser.extract_phone())