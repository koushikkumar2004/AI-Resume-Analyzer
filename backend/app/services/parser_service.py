import re
from app.database.skills import SKILLS
from app.database.education import DEGREES


class ResumeParser:

    def __init__(self, text: str):
        self.text = text

    def extract_email(self):
        pattern = r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"

        match = re.search(pattern, self.text)

        if match:
            return match.group()

        return None

    def extract_phone(self):
        pattern = r"(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{2,4}\)?[-.\s]?)?\d{3,5}[-.\s]?\d{4}"

        match = re.search(pattern, self.text)

        if match:
            return match.group().strip()

        return None

    def extract_name(self):
        ignored_words = {
            "resume",
            "curriculum vitae",
            "cv",
            "profile",
            "professional summary",
            "summary",
        }

        lines = self.text.split("\n")

        for line in lines:
            line = line.strip()

            if not line:
                continue

            if line.lower() in ignored_words:
                continue

            if len(line.split()) <= 4:
                return line

        return None

    def extract_skills(self):
        detected_skills = []

        resume_text = self.text.lower()

        for skill in SKILLS:
            if skill.lower() in resume_text:
                detected_skills.append(skill)

        return sorted(set(detected_skills))

    def extract_education(self):
       detected_education = []

       resume_text = self.text.lower()

       for degree in DEGREES:
           if degree.lower() in resume_text:
               detected_education.append(degree)

       return sorted(set(detected_education))