
def home():
    return {"message": "GlobalHire Python Service is running"}


job = {
    "title": "Backend Developer",
    "skills": ["Python", "SQL", "REST API"]
}

candidate = {
    "name": "Alex",
    "skills": ["Python", "SQL", "HTML"]
}

candidate2 = {
    "name": "Sam",
    "skills": ["JavaScript", "HTML", "CSS"]
}

candidate3 = {
    "name": "Jordan",
    "skills": ["Python", "SQL", "REST API"]
}



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


if __name__ == "__main__":
    print(home())
    print()

    print("Job:", job["title"])
    print("Required skills:", job["skills"])
    print()

    for person in [candidate, candidate2, candidate3]:
        skills, score = calculate_match(
            job["skills"], person["skills"]
        )
        print(f"{person['name']} matching skills: {skills}")
        print(f"{person['name']} match score: {score:.2f}%")
        print()

    print("=== Candidate Ranking ===")

    rankings = []

    for person in [candidate, candidate2, candidate3]:
        _, score = calculate_match(job["skills"], person["skills"])
        rankings.append({"name": person["name"], "score": score})

    rankings.sort(
        key=lambda person: person["score"],
        reverse=True
    )

    for rank, person in enumerate(rankings, start=1):
        print(f"{rank}. {person['name']} - {person['score']:.2f}%")

    print()

print("=== Empty Job Skills Test ===")

test_skills, test_score = calculate_match(
    [], ["Python", "SQL"]
)
print("Matching skills:", test_skills)
print(f"Match score: {test_score:.2f}%")

print()
print("=== Duplicate Skills Test ===")

test_skills, test_score = calculate_match(
    ["Python", "SQL", "Python"],
    ["Python", "Python", "SQL"]
)
print("Matching skills:", test_skills)
print(f"Match score: {test_score:.2f}%")

print()
print("=== Capitalization and Spaces Test ===")

test_skills, test_score = calculate_match(
    ["Python", "SQL"],
    ["python", " sql "]
)
print("Matching skills:", test_skills)
print(f"Match score: {test_score:.2f}%")
