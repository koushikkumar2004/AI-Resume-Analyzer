from app.services.parser_service import ResumeParser

sample_text = """
John Doe

Email: john@email.com

Phone: +91 9876543210

Bachelor of Engineering in Information Science

Skills

Python
Java
React
FastAPI
MongoDB
Git
Docker
"""

parser = ResumeParser(sample_text)

print("Name :", parser.extract_name())
print("Email:", parser.extract_email())
print("Phone:", parser.extract_phone())
print("Skills:", parser.extract_skills())
print("Education:", parser.extract_education())