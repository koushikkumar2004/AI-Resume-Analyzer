class ResumeJobMatcher:

    def compare_skills(self, resume_skills, required_skills):
        resume_skill_set = {
            skill.lower()
            for skill in resume_skills
        }

        required_skill_set = {
            skill.lower()
            for skill in required_skills
        }

        matched_skills = sorted(
            resume_skill_set.intersection(required_skill_set)
        )

        missing_skills = sorted(
            required_skill_set.difference(resume_skill_set)
        )

        match_percentage = 0

        if required_skill_set:
            match_percentage = round(
                (len(matched_skills) / len(required_skill_set)) * 100,
                2
            )

        return {
            "matched_skills": matched_skills,
            "missing_skills": missing_skills,
            "match_percentage": match_percentage,
        }