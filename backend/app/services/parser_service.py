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
        pass

    def extract_skills(self):
        pass

    def extract_education(self):
        pass