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

print(parser.parse_resume())