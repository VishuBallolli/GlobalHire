from fastapi import APIRouter

from database.connection import get_all_jobs


router = APIRouter()


@router.get("/jobs")
def get_jobs():
    jobs = get_all_jobs()

    return {
        "total_jobs": len(jobs),
        "jobs": jobs
    }