from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI
from routers.candidates import router as candidates_router
from routers.jobs import router as jobs_router

load_dotenv(Path(__file__).resolve().parent / ".env")

app = FastAPI(title="GlobalHire Python Matching API")


@app.get("/")
def home():
    return {"message": "GlobalHire Python Service is running"}


app.include_router(candidates_router)
app.include_router(jobs_router)