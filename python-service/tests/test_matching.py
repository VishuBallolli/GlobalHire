from services.matching import calculate_match, get_candidate_match


def test_exact_skill_matching():
    job_skills = ["Python", "SQL", "REST API"]
    candidate_skills = ["Python", "SQL", "REST API"]

    matching_skills, score = calculate_match(
        job_skills,
        candidate_skills
    )

    assert matching_skills == ["python", "rest api", "sql"]
    assert score == 100.0


def test_case_insensitive_matching():
    job_skills = ["Python", "SQL"]
    candidate_skills = ["python", "sql"]

    matching_skills, score = calculate_match(
        job_skills,
        candidate_skills
    )

    assert matching_skills == ["python", "sql"]
    assert score == 100.0


def test_no_matching_skills():
    job_skills = ["Java", "Spring Boot"]
    candidate_skills = ["Python", "SQL"]

    matching_skills, score = calculate_match(
        job_skills,
        candidate_skills
    )

    assert matching_skills == []
    assert score == 0.0


def test_empty_job_skills():
    matching_skills, score = calculate_match(
        [],
        ["Python", "SQL"]
    )

    assert matching_skills == []
    assert score == 0


def test_get_candidate_match():
    job = {
        "skills": ["Python", "SQL"]
    }

    candidate = {
        "name": "Test User",
        "skills": ["Python", "Java"]
    }

    result = get_candidate_match(job, candidate)

    assert result["name"] == "Test User"
    assert result["matching_skills"] == ["python"]
    assert result["match_score"] == 50.0

def test_whitespace_and_duplicate_skills():
    job_skills = [" Python ", "SQL", "SQL"]
    candidate_skills = ["python", " Python "]

    matching_skills, score = calculate_match(
        job_skills,
        candidate_skills
    )

    assert matching_skills == ["python"]
    assert score == 50.0


def test_candidate_with_no_skills():
    job_skills = ["Python", "SQL"]
    candidate_skills = []

    matching_skills, score = calculate_match(
        job_skills,
        candidate_skills
    )

    assert matching_skills == []
    assert score == 0.0