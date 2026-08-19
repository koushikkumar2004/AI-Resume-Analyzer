SKILL_RECOMMENDATIONS = {
    "python": "Strengthen Python by practicing data structures, algorithms, and backend development.",
    "java": "Strengthen Java by practicing OOP, collections, exception handling, and DSA.",
    "javascript": "Improve JavaScript fundamentals including ES6+, asynchronous programming, and DOM concepts.",
    "react": "Build React projects using components, hooks, state management, and API integration.",
    "node.js": "Build backend APIs with Node.js, Express, authentication, and database integration.",
    "sql": "Practice SQL joins, subqueries, aggregation, indexing, and database design.",
    "mongodb": "Practice MongoDB schema design, aggregation pipelines, indexing, and CRUD operations.",
    "docker": "Containerize one of your projects and learn Docker images, containers, volumes, and networking.",
    "aws": "Learn AWS fundamentals and deploy a small application using services such as EC2, S3, or RDS.",
    "git": "Practice Git branching, pull requests, merge conflicts, and collaborative workflows.",
    "fastapi": "Build REST APIs with FastAPI using validation, authentication, and asynchronous endpoints.",
}

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

        for skill in missing_skills:
            recommendation = SKILL_RECOMMENDATIONS.get(
                skill.lower()
            )

            if recommendation:
                suggestions.append(
                    f"{skill}: {recommendation}"
                )

        if ats_score < 70:
            suggestions.append(
                "Improve your resume content and keyword relevance to increase ATS compatibility."
            )

        return suggestions