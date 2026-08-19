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


from app.services.job_parser_service import JobDescriptionParser


job_description = """
We are looking for a Software Developer.

Required skills:
Python
React
SQL
Docker
AWS
"""

job_parser = JobDescriptionParser(job_description)

print("Required Skills:", job_parser.extract_required_skills())