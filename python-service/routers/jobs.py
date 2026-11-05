
from fastapi import APIRouter, HTTPException, Query

from database.connection import get_all_jobs, get_job_by_id, search_jobs

router = APIRouter()


# Search jobs with input validation
@router.get("/jobs/search")
def search_jobs_endpoint(title: str = Query(min_length=2)):
    jobs = search_jobs(title)

    return {
        "total_jobs": len(jobs),
        "jobs": jobs
    }


# Get all jobs
@router.get("/jobs")
def get_jobs():
    return get_all_jobs()


# Get job by ID
@router.get(
    "/jobs/{job_id}",
    responses={
        404: {"description": "Job not found"}
    }
)
def get_job(job_id: int):
    job = get_job_by_id(job_id)

    if job is None:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    return job
