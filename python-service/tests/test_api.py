from fastapi.testclient import TestClient

from app import app


client = TestClient(app)


def test_home_endpoint():
    response = client.get("/")

    assert response.status_code == 200
    assert response.json() == {
        "message": "GlobalHire Python Service is running"
    }


def test_get_all_jobs():
    response = client.get("/jobs")

    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert len(response.json()) > 0


def test_search_jobs():
    response = client.get("/jobs/search?title=Backend")

    assert response.status_code == 200

    data = response.json()

    assert data["total_jobs"] > 0
    assert len(data["jobs"]) == data["total_jobs"]

    for job in data["jobs"]:
        assert "backend" in job["title"].lower()


def test_job_not_found():
    response = client.get("/jobs/999999")

    assert response.status_code == 404
    assert response.json()["detail"] == "Job not found"