class ResumeSuggestionService:

    def generate_suggestions(
        self,
        resume_data,
        missing_skills,
        ats_score
    ):
        suggestions = []

        if not resume_data.get("summary"):
            suggestions.append(
                "Add a professional summary at the beginning of your resume."
            )

        if not resume_data.get("experience"):
            suggestions.append(
                "Add relevant internship, work, or practical project experience."
            )

        if not resume_data.get("skills"):
            suggestions.append(
                "Add a dedicated technical skills section."
            )

        if missing_skills:
            suggestions.append(
                f"Consider adding relevant skills from the job description: "
                f"{', '.join(missing_skills)}."
            )

        if ats_score < 70:
            suggestions.append(
                "Improve your resume content and keyword relevance to increase ATS compatibility."
            )

        return suggestions