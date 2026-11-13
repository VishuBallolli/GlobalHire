
import mysql.connector


def get_db_connection():
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="globalhire_db_recovered"
    )

    return connection

# Get all jobs
def get_all_jobs():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT * FROM jobs")

    jobs = cursor.fetchall()

    cursor.close()
    connection.close()

    return jobs


# Get job by ID
def get_job_by_id(job_id):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM jobs WHERE id = %s",
        (job_id,)
    )

    job = cursor.fetchone()

    cursor.close()
    connection.close()

    return job


# Search jobs by title
def search_jobs(title):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM jobs WHERE title LIKE %s",
        (f"%{title}%",)
    )

    jobs = cursor.fetchall()

    cursor.close()
    connection.close()

    return jobs

# Get candidate profile and skills by user ID
def get_candidate_by_user_id(user_id):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        cursor.execute(
            """
            SELECT
                cp.id AS profile_id,
                u.id AS user_id,
                u.name AS candidate_name,
                cs.skill_name
            FROM candidate_profiles cp
            JOIN users u ON cp.user_id = u.id
            LEFT JOIN candidate_skills cs
                ON cp.id = cs.candidate_profile_id
            WHERE u.id = %s
            """,
            (user_id,)
        )

        rows = cursor.fetchall()

        if not rows:
            return None

        return {
            "candidate_id": rows[0]["user_id"],
            "candidate_name": rows[0]["candidate_name"],
            "skills": [
                row["skill_name"]
                for row in rows
                if row["skill_name"] is not None
            ]
        }

    finally:
        cursor.close()
        connection.close()

# Get all jobs with their required skills
def get_all_jobs_with_skills():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    try:
        cursor.execute(
            """
            SELECT
                j.id AS job_id,
                j.title,
                j.country,
                j.salary,
                js.skill_name
            FROM jobs j
            LEFT JOIN job_skills js
                ON j.id = js.job_id
            ORDER BY j.id
            """
        )

        rows = cursor.fetchall()

        jobs = {}

        for row in rows:
            job_id = row["job_id"]

            if job_id not in jobs:
                jobs[job_id] = {
                    "job_id": job_id,
                    "title": row["title"],
                    "country": row["country"],
                    "salary": row["salary"],
                    "skills": []
                }

            if row["skill_name"] is not None:
                jobs[job_id]["skills"].append(
                    row["skill_name"]
                )

        return list(jobs.values())

    finally:
        cursor.close()
        connection.close()