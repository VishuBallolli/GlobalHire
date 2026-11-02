from fastapi import FastAPI
from routers.candidates import router as candidates_router

app = FastAPI(title="GlobalHire Python Matching API")


@app.get("/")
def home():
    return {"message": "GlobalHire Python Service is running"}


app.include_router(candidates_router)