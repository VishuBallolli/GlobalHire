def calculate_match(job_skills, candidate_skills):
    job_skills = {
        skill.strip().lower() for skill in job_skills
    }

    candidate_skills = {
        skill.strip().lower() for skill in candidate_skills
    }

    if not job_skills:
        return [], 0

    matching_skills = sorted(job_skills & candidate_skills)

    score = len(matching_skills) / len(job_skills) * 100

    return matching_skills, score


def get_candidate_match(job, candidate):
    matching_skills, score = calculate_match(
        job["skills"],
        candidate["skills"]
    )

    return {
        "name": candidate["name"],
        "matching_skills": matching_skills,
        "match_score": round(score, 2)
    }