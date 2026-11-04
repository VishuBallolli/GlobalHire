from fastapi import APIRouter, HTTPException

from database.connection import get_all_jobs, get_job_by_id


router = APIRouter()


@router.get("/jobs")
def get_jobs():
    jobs = get_all_jobs()

    return {
        "total_jobs": len(jobs),
        "jobs": jobs
    }


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