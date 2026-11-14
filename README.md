# GlobalHire – Global Job & Talent Matching Platform

GlobalHire is a full-stack web application designed to connect job seekers with employers across different countries.

The platform aims to help candidates discover international job opportunities and help employers find suitable talent through job matching.

---

## Project Goals

- Build a full-stack job and talent matching platform.
- Develop REST APIs using Node.js and Express.
- Store application data using MySQL.
- Build candidate and employer functionality.
- Implement job matching using Python.
- Learn professional software engineering practices.
- Gradually introduce testing, Docker, CI/CD, cloud deployment, and AI-powered features.

---

## User Roles

### Candidate
- Register and log in.
- Create and manage a candidate profile.
- Add skills and professional information.
- Browse available jobs.
- Find relevant job opportunities.

### Employer
- Register and log in.
- Create and manage job listings.
- View candidate information.
- Find candidates based on skills and job requirements.

---

## Technology Stack

### Frontend
- HTML5
- CSS3
- Bootstrap
- JavaScript
- TypeScript (planned)
- React (planned)
- Next.js fundamentals (planned)

### Backend
- Node.js
- Express.js
- REST APIs
- Python matching service

### Database
- MySQL
- MariaDB through XAMPP
- SQL

### Development Tools
- Visual Studio Code
- Git
- GitHub
- Postman
- XAMPP
- PowerShell
- pytest

### Planned Tools and Technologies
- Docker
- GitHub Actions
- AWS fundamentals
- PostgreSQL
- Redis
- Automated testing tools
- AI API integration

---

## Project Structure

```text
GlobalHire/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── config/
│   └── package.json
│
├── frontend/
│
├── python-service/
│   ├── app.py
│   └── tests/
│
├── database/
│   ├── globalhire_day12.sql
│   └── globalhire_matching.sql
│
├── README.md
└── .gitignore
```

*The folder structure may evolve as development continues.*

---

## Development Progress

This project is being developed incrementally through daily learning and implementation tasks.

### Completed Milestones

- **Day 1–15:** Initial project setup and foundational development.
- **Day 24–27:** Continued backend and database development.
- **Day 36:** Python job-matching functionality and API tests.
- **Day 37:** Database recovery investigation.
- **Day 38:** Database recovery validation and backend integration.
- **Day 39:** Node.js backend learning and API verification.

### Day 36 – Python Matching and API Tests

- Continued development of the Python matching service.
- Added Python matching functionality.
- Added API-related tests.
- Verified that the Python service had 11 passing pytest tests.
- Committed and pushed the changes to GitHub.

Latest Day 36 implementation commit:

`f0c130c` – Add Python matching and API tests

### Day 37 – Database Recovery Investigation

Investigated a MariaDB/InnoDB database issue affecting the GlobalHire application.

**Problem identified:**

Some GlobalHire tables appeared in the database, but queries failed with the following error:

```text
1932 (42S02): Table 'globalhire_db.jobs'
doesn't exist in engine
```

**Recovery investigation performed:**

- Investigated the MariaDB/InnoDB table issue.
- Created a safety backup of the original MySQL data directory.
- Created a separate recovery working copy.
- Verified important InnoDB file hashes between the backup and recovery copy.
- Created separate MariaDB recovery configurations.
- Started isolated recovery environments.
- Investigated missing InnoDB table registrations.
- Worked toward recovering the affected database tables.

### Day 38 – Database Recovery and Backend Integration

Successfully recovered and validated the GlobalHire database in a separate database environment.

**Database recovery and validation:**

- Recovered all five affected database tables.
- Exported the recovered SQL data.
- Imported the recovered data into an isolated validation database.
- Verified 47 recovered records.
- Checked primary keys and unique indexes.
- Verified three foreign key relationships with `ON DELETE CASCADE`.
- Performed cascade deletion tests inside transactions and rolled them back.
- Created a separate recovered database named `globalhire_db_recovered`.
- Imported and verified the recovered SQL data in the new database.
- Confirmed that the original damaged `globalhire_db` database remained untouched.
- Verified that the recovered database had five accessible InnoDB tables.
- Checked foreign key relationships and orphan records.

**Backend integration:**

- Updated the Node.js backend database configuration.
- Updated the Python service database connection.
- Configured application environment variables and rotated internal API keys.
- Configured the JWT secret.
- Verified Node.js registration and login functionality.
- Tested duplicate registration handling with HTTP 409.
- Verified protected authentication using JWT.
- Confirmed Python database connectivity.
- Ran Python automated tests: **11 passed**.

**GitHub update:**

Latest Day 38 implementation commit:

`d8634a5` – Fix Python database connection after recovery

Successfully pushed the commit to the GitHub `main` branch.

### Day 39 – Node.js Backend Learning and API Verification

Focused on understanding the existing Node.js and Express backend and verifying application functionality.

**Backend concepts studied:**

- Reviewed the Node.js backend project structure.
- Studied Express middleware and request handling.
- Understood the purpose of `next()` in Express middleware.
- Learned how MySQL connection pooling works using `mysql2/promise`.
- Reviewed centralized error-handling middleware.
- Practiced understanding HTTP status codes such as 200, 201, 400, 401, 404, 409, and 500.

**Backend verification:**

- Started the Node.js backend successfully.
- Verified that the server was running at `http://localhost:3000`.
- Tested the `GET /api/jobs` endpoint.
- Successfully retrieved **7 job records** from the recovered database.
- Confirmed that the Node.js backend could communicate with MySQL.

---

## Backend API Endpoints

The backend is developed using Node.js and Express.

Base URL:

```text
http://localhost:3000
```

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check backend health |
| GET | `/api/jobs` | Retrieve job listings |
| GET | `/api/jobs/1` | Retrieve a job by ID |

Additional endpoints will be documented as they are implemented and tested.

---

## Running the Project Locally

### 1. Start MySQL

- Open XAMPP Control Panel.
- Start MySQL.
- Verify the configured MySQL port.

### 2. Start the Node.js Backend

Open PowerShell in the project directory:

```powershell
npm.cmd start --prefix backend
```

### 3. Test the Backend

Open these URLs in a browser or test them using Postman:

```text
http://localhost:3000/api/health
http://localhost:3000/api/jobs
http://localhost:3000/api/jobs/1
```

### 4. Test the Python Service

Run the Python service tests from the project directory using the appropriate Python environment:

```powershell
python -m pytest python-service/tests -v
```

*Database-dependent tests require a working and correctly configured database.*

---

## Development Workflow

The project follows a practical software development workflow:

1. Understand the task.
2. Plan the implementation.
3. Write and organize the code.
4. Configure the database and backend.
5. Test APIs using Postman.
6. Run automated tests.
7. Debug and fix issues.
8. Review Git changes.
9. Commit completed work.
10. Push changes to GitHub.

---

## Planned Roadmap

The following technologies and features will be introduced gradually.

### Frontend Development
- Responsive UI.
- TypeScript.
- React.
- Next.js fundamentals.
- Accessibility.
- Frontend testing.

### Backend Development
- Authentication and authorization.
- Secure password handling.
- Sessions, cookies, and JWT.
- OAuth/OIDC fundamentals.
- Input validation.
- API documentation using Swagger/OpenAPI.
- Backend testing.

### Database Development
- Advanced SQL.
- PostgreSQL.
- Database relationships.
- Joins and indexes.
- Transactions.
- Database migrations.
- Database optimization.

### Software Engineering
- Data Structures and Algorithms.
- Object-Oriented Programming.
- SOLID principles.
- Design patterns.
- Clean code.
- Debugging.
- Code reviews.
- Linux and networking fundamentals.

### Testing
- Unit testing.
- Integration testing.
- API testing.
- End-to-end testing.
- Vitest/Jest.
- Playwright.

### DevOps and Cloud
- Docker and Docker Compose.
- GitHub Actions.
- CI/CD pipelines.
- AWS fundamentals.
- Cloud deployment.
- Logging and monitoring.
- Application reliability.

### Advanced Backend Concepts
- Redis caching.
- Background jobs.
- Message queues.
- Distributed systems fundamentals.
- Basic system design.

### AI Integration
- AI API integration.
- Structured AI outputs.
- Embeddings.
- Semantic search.
- Retrieval-Augmented Generation (RAG).
- AI evaluation.
- Privacy and cost management.

---

## Future Projects

After strengthening the foundations of GlobalHire, additional focused projects will be developed:

- **MiniScale:** A distributed-systems learning project.
- **Verity AI:** An AI-powered research assistant.

These projects are planned future work, not completed features of GlobalHire.

---

## Career Preparation

The long-term learning plan also includes:

- Professional English communication.
- Technical interview preparation.
- Data Structures and Algorithms.
- Resume and LinkedIn development.
- GitHub portfolio improvement.
- Practical project experience.
- Internship applications.
- International software engineering opportunities.

---

## GitHub Repository

[GlobalHire – GitHub Repository](https://github.com/VishuBallolli/GlobalHire)

---

## Current Project Status

**Project:** GlobalHire

**Current milestone:** Day 39 – Node.js Backend Learning and API Verification

**Backend:** Node.js and Express

**Matching service:** Python

**Database:** MySQL/MariaDB

**Version control:** Git and GitHub

**Latest verified backend result:** Successfully retrieved 7 job records through the `/api/jobs` endpoint.

**Latest implementation commit:** `d8634a5`

**Current priority:** Continue backend development, testing, and application improvements.

---

## Learning Philosophy

GlobalHire is being developed as a practical learning project.

The goal is not simply to finish a project, but to understand how real-world software applications are designed, developed, tested, debugged, deployed, and maintained.

New technologies and advanced features will be introduced progressively as the foundational concepts become stronger.