from fastapi import APIRouter

from models.candidate import CandidateListResponse
from services.data import job, candidates
from services.matching import get_candidate_match


router = APIRouter()


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