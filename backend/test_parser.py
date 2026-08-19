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

required_skills = []


matcher = ResumeJobMatcher()

result = matcher.compare_skills(
    resume_skills,
    required_skills
)

print("Matched Skills:", result["matched_skills"])
print("Missing Skills:", result["missing_skills"])
print("Match Percentage:", result["match_percentage"], "%")


from app.services.ats_service import ATSScorer


resume_data = {
    "name": "",
    "email": "",
    "phone": "",
    "skills": ["Python", "React", "SQL"],
    "education": ["Bachelor of Engineering"],
    "summary": "Software developer interested in AI and full-stack development.",
    "experience": [
        "Software Engineering Intern"
    ]
}

scorer = ATSScorer()

ats_score = scorer.calculate_score(resume_data)

print("ATS Score:", ats_score)


from app.services.suggestion_service import ResumeSuggestionService


resume_data = {
    "name": "John Doe",
    "email": "john@email.com",
    "phone": "+91 9876543210",
    "skills": ["Python", "React"],
    "education": ["Bachelor of Engineering"]
}

missing_skills = [
    "AWS",
    "SQL"
]

ats_score = 60

suggestion_service = ResumeSuggestionService()

suggestions = suggestion_service.generate_suggestions(
    resume_data,
    missing_skills,
    ats_score
)

print("Suggestions:")

for suggestion in suggestions:
    print("-", suggestion)


from app.services.suggestion_service import ResumeSuggestionService


resume_data = {
    "name": "John Doe",
    "email": "john@email.com",
    "phone": "+91 9876543210",
    "skills": ["Python", "React"],
    "education": ["Bachelor of Engineering"]
}

missing_skills = [
    "AWS",
    "SQL",
    "Docker"
]

ats_score = 60

suggestion_service = ResumeSuggestionService()

suggestions = suggestion_service.generate_suggestions(
    resume_data,
    missing_skills,
    ats_score
)

print("Suggestions:")

for suggestion in suggestions:
    print("-", suggestion)