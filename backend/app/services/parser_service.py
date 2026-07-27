import re


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
        pass

    def extract_education(self):
        pass