class ATSScorer:

    def calculate_score(self, resume_data):
        score = 0

        if resume_data.get("name"):
            score += 10

        if resume_data.get("email"):
            score += 5

        if resume_data.get("phone"):
            score += 5

        if resume_data.get("skills"):
            score += 30

        if resume_data.get("education"):
            score += 20

        if resume_data.get("summary"):
            score += 15

        if resume_data.get("experience"):
            score += 15

        return score