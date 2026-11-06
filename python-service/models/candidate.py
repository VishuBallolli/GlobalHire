from pydantic import BaseModel


class CandidateMatch(BaseModel):
    name: str
    matching_skills: list[str]
    match_score: float


class CandidateListResponse(BaseModel):
    job_title: str
    candidates: list[CandidateMatch]

class JobMatch(BaseModel):
    job_id: int
    title: str
    country: str
    salary: int | None
    required_skills: list[str]
    matching_skills: list[str]
    match_score: float


class CandidateJobMatchesResponse(BaseModel):
    candidate_id: int
    candidate_name: str
    jobs: list[JobMatch]