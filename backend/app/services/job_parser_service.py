import re
from app.database.skills import SKILLS


class JobDescriptionParser:

    def __init__(self, text: str):
        self.text = text

    def extract_required_skills(self):
        detected_skills = []

        job_text = self.text.lower()

        for skill in SKILLS:
            pattern = r"\b" + re.escape(skill.lower()) + r"\b"

            if re.search(pattern, job_text):
                detected_skills.append(skill)

        return sorted(set(detected_skills))