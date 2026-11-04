import mysql.connector


def get_db_connection():
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="globalhire_db"
    )

    return connection


def get_all_jobs():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT * FROM jobs")

    jobs = cursor.fetchall()

    cursor.close()
    connection.close()

    return jobs

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