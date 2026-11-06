

from fastapi import APIRouter, HTTPException

from models.candidate import (
    CandidateListResponse,
    CandidateJobMatchesResponse
)

from services.data import job, candidates

from services.matching import (
    get_candidate_match,
    calculate_match
)

from database.connection import (
    get_candidate_by_user_id,
    get_all_jobs_with_skills
)


router = APIRouter()


# Existing endpoint: Get sample candidates
@router.get(
    "/candidates",
    response_model=CandidateListResponse
)
def get_candidates():
    results = []

    for person in candidates:
        results.append(get_candidate_match(job, person))

    results.sort(
        key=lambda person: person["match_score"],
        reverse=True
    )

    return {
        "job_title": job["title"],
        "candidates": results
    }


# New endpoint: Get personalized job matches
@router.get(
    "/candidates/{user_id}/job-matches",
    response_model=CandidateJobMatchesResponse
)
def get_candidate_job_matches(user_id: int):

    candidate = get_candidate_by_user_id(user_id)

    if candidate is None:
        raise HTTPException(
            status_code=404,
            detail="Candidate profile not found"
        )

    jobs = get_all_jobs_with_skills()

    results = []

    for job in jobs:
        matching_skills, score = calculate_match(
            job["skills"],
            candidate["skills"]
        )

        results.append({
            "job_id": job["job_id"],
            "title": job["title"],
            "country": job["country"],
            "salary": job["salary"],
            "required_skills": job["skills"],
            "matching_skills": matching_skills,
            "match_score": round(score, 2)
        })

    results.sort(
        key=lambda item: item["match_score"],
        reverse=True
    )

    return {
        "candidate_id": candidate["candidate_id"],
        "candidate_name": candidate["candidate_name"],
        "jobs": results
    }
