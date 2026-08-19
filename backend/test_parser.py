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
PYTHON developer required.

Experience with REACT,
docker and SQL preferred.
"""

job_parser = JobDescriptionParser(job_description)

print("Required Skills:", job_parser.extract_required_skills())


from app.services.matching_service import ResumeJobMatcher


resume_skills = [
    "Python",
    "React",
    "MongoDB",
    "Git"
]

required_skills = [
    "Python",
    "React",
    "SQL",
    "Docker",
    "AWS"
]

matcher = ResumeJobMatcher()

result = matcher.compare_skills(
    resume_skills,
    required_skills
)

print("Matched Skills:", result["matched_skills"])
print("Missing Skills:", result["missing_skills"])