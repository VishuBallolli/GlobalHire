from pydantic import BaseModel


class CandidateMatch(BaseModel):
    name: str
    matching_skills: list[str]
    match_score: float


class CandidateListResponse(BaseModel):
    job_title: str
    candidates: list[CandidateMatch]