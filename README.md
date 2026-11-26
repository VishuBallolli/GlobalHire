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

**Current milestone:** Day 49 – RBAC Authorization Testing

**Latest verified backend test result:** 24 passed, 0 failed.

**Backend:** Node.js and Express

**Matching service:** Python

**Database:** MySQL/MariaDB

**Authentication:** JWT

**Authorization:** Role-Based Access Control (RBAC)

**Version control:** Git and GitHub

**Latest pushed implementation commit:** `d45c49b`

**Current priority:** Continue backend development, testing, security, and application improvements.
---

## Learning Philosophy

GlobalHire is being developed as a practical learning project.

The goal is not simply to finish a project, but to understand how real-world software applications are designed, developed, tested, debugged, deployed, and maintained.

New technologies and advanced features will be introduced progressively as the foundational concepts become stronger.
---

## Day 40 - REST API and CRUD Fundamentals

### Topics Learned
- REST API fundamentals.
- HTTP methods: GET, POST, PUT, DELETE.
- CRUD operations: Create, Read, Update, Delete.
- Express routes and MySQL responsibilities.
- Request body validation.
- HTTP status codes, including 201 Created and 400 Bad Request.
- Parameterized SQL queries.

### Practical Implementation and Testing
- Inspected the existing Express POST `/api/jobs` route.
- Understood salary validation and JSON request validation.
- Verified the Node.js backend health endpoint.
- Successfully created a Python Developer job using POST `/api/jobs`.
- Retrieved all jobs using GET `/api/jobs`.
- Retrieved the newly created job using GET `/api/jobs/10`.
- Verified the saved record in phpMyAdmin.

### Verified New Job Record

| Field | Value |
|---|---|
| Job ID | 10 |
| Title | Python Developer |
| Country | India |
| Salary | 60000 |

### Database Verification
- Database: `globalhire_db_recovered`
- Table: `jobs`
- New record successfully verified.

### Learning Outcome
Practiced the complete job-creation flow from an HTTP POST request through Express validation and MySQL insertion, followed by API and database verification.


---

## Day 41 - PUT and DELETE API Testing

### Topics Learned
- PUT and DELETE HTTP methods.
- Updating existing database records.
- Deleting database records.
- HTTP status codes: 200 OK and 404 Not Found.
- API testing using PowerShell.
- Verifying database changes through GET requests.

### Practical Implementation and Testing
- Inspected the existing Express PUT `/api/jobs/:id` route.
- Inspected the existing Express DELETE `/api/jobs/:id` route.
- Started the Node.js backend.
- Successfully updated Job ID 10 using PUT.
- Changed the Python Developer salary from 60000 to 75000.
- Verified the updated record using GET.
- Successfully deleted Job ID 10 using DELETE.
- Verified that GET returned 404 Job Not Found after deletion.

### Verified Results
| Operation | Result |
|---|---|
| PUT /api/jobs/10 | Successful |
| GET /api/jobs/10 | Updated record verified |
| DELETE /api/jobs/10 | Successful |
| GET /api/jobs/10 after deletion | 404 Not Found |

### Learning Outcome
Practiced updating and deleting database records through Express REST APIs and verified the results using HTTP requests.

### Next Steps
- Improve API testing.
- Test invalid inputs and error responses.
- Continue backend development.

---

## Day 42 - API Validation and Error Handling

### Topics Learned
- API input validation.
- Validating positive integer IDs.
- HTTP status codes: 400 Bad Request, 404 Not Found, and 500 Internal Server Error.
- Centralized Express error-handling middleware.
- Handling malformed JSON requests.
- Database connection testing.

### Practical Implementation and Testing
- Inspected the `validateJobId()` function.
- Reviewed POST and PUT job validation.
- Reviewed centralized Express error-handling middleware.
- Started the Node.js backend and verified the health endpoint.
- Tested invalid job titles.
- Tested negative and string salary values.
- Tested invalid and zero job IDs.
- Tested a valid but non-existing job ID.
- Tested malformed JSON request bodies.
- Verified the MySQL database connection using `test-db.js`.

### Verified Results
| Test | Expected Result |
|---|---|
| Empty job title | 400 Bad Request |
| Negative salary | 400 Bad Request |
| String salary | 400 Bad Request |
| Invalid job ID | 400 Bad Request |
| Job ID 999999 | 404 Not Found |
| Malformed JSON | 400 Bad Request |
| Database connection | Successful |
| Health endpoint | Successful |

### Learning Outcome
Learned how to validate API inputs, handle invalid requests, return appropriate HTTP status codes, manage unexpected errors, and verify backend database connectivity.

### Next Steps
- Set up automated backend API tests.
- Continue improving backend reliability.
---

## Day 43 - Automated Backend API Testing

### Topics Learned
- Automated testing with Node.js built-in test runner.
- HTTP endpoint testing using Supertest.
- Testing API response status codes and JSON responses.
- Testing successful and unsuccessful API requests.
- Managing MySQL connection pool cleanup during automated tests.

### Practical Implementation and Testing
- Installed Supertest as a development dependency.
- Exported the Express application for automated testing.
- Created `backend/tests/api.test.js`.
- Tested the GET /api/health endpoint.
- Tested the GET /api/jobs endpoint.
- Tested retrieving a job using GET /api/jobs/:id.
- Tested invalid job IDs and verified HTTP 400 responses.
- Tested non-existing job IDs and verified HTTP 404 responses.
- Added MySQL connection pool cleanup after API tests.
- Executed the complete backend test suite using `npm.cmd test`.

### Verified Results
| Test | Result |
|---|---|
| MySQL database connection | Passed |
| GET /api/health | Passed |
| GET /api/jobs | Passed |
| GET /api/jobs/1 | Passed |
| Invalid job ID | 400 Bad Request |
| Non-existing job ID | 404 Not Found |
| Total automated tests | 6 Passed, 0 Failed |

### Learning Outcome
Learned how to write and execute automated backend tests, verify REST API responses, test validation and error handling, and manage database connections during testing.

### Next Steps
- Expand automated API test coverage.
- Test search and authentication endpoints.
- Continue improving backend reliability.

## Day 44 – Search API Testing

### Completed Tasks
- Reviewed the existing GET /api/search endpoint.
- Understood title and country search filters.
- Added an automated test for GET /api/search.
- Verified that the search endpoint returns a list of jobs.
- Started MySQL and verified the database connection.
- Executed the complete backend test suite using `npm.cmd test`.

### Verified Results
| Test | Result |
|---|---|
| MySQL database connection | Passed |
| GET /api/health | Passed |
| GET /api/jobs | Passed |
| GET /api/jobs/1 | Passed |
| Invalid job ID | 400 Bad Request |
| Non-existing job ID | 404 Not Found |
| GET /api/search | Passed |
| Total automated tests | 7 Passed, 0 Failed |

### Learning Outcome
Learned how to test search API functionality using automated tests, understand database-dependent API failures, and verify successful MySQL connectivity.

### Next Steps
- Expand search API test coverage.
- Test authentication endpoints.
- Continue improving backend reliability.

## Day 45 - Authentication API Testing

### Completed Tasks
- Reviewed the JWT authentication middleware.
- Understood Bearer token validation.
- Tested the protected GET /api/auth/me endpoint.
- Verified that requests without authentication tokens return HTTP 401.
- Verified that invalid JWT tokens return HTTP 401.
- Tested login email validation.
- Tested empty password validation.
- Used Supertest and the Node.js built-in test runner.
- Verified successful MySQL connectivity.

### Verified Results
| Test | Result |
|---|---|
| MySQL database connection | Passed |
| GET /api/health | Passed |
| GET /api/jobs | Passed |
| GET /api/jobs/1 | Passed |
| Invalid job ID | 400 Bad Request |
| Missing job | 404 Not Found |
| GET /api/search | Passed |
| Missing authentication token | 401 Unauthorized |
| Invalid authentication token | 401 Unauthorized |
| Invalid login email | 400 Bad Request |
| Empty login password | 400 Bad Request |
| Total automated tests | 11 Passed, 0 Failed |

### Learning Outcome
Learned how JWT authentication middleware protects API endpoints, how Bearer tokens are validated, and how to test authentication failures and login input validation using automated API tests.

### Next Steps
- Test successful login.
- Verify JWT-based profile access.
- Expand authentication test coverage.
- Continue improving backend security.

## Day 46 – Successful Login and JWT Profile Access Testing

### Completed
- Added automated tests for successful user login.
- Verified JWT token generation and response structure.
- Verified Bearer token authentication.
- Tested protected user profile access using a valid JWT.
- Created a temporary test user through the registration API.
- Added automatic cleanup of the temporary test user.

### Test Results
- Total tests: 13
- Passed: 13
- Failed: 0

### Key Learning
Successfully tested the complete authentication flow: registration → login → JWT generation → protected profile access.

**Status: Completed**
## Day 47 - JWT Authentication Security Testing

### Completed
- Added automated tests for expired JWT tokens.
- Added automated tests for tampered JWT tokens.
- Verified rejection of missing and invalid authentication tokens.
- Verified successful login and JWT generation.
- Verified protected user profile access using a valid JWT.
- Executed the complete backend test suite using npm.cmd test.

### Verified Results
| Test | Result |
|---|---|
| MySQL database connection | Passed |
| Health and Jobs APIs | Passed |
| Search API | Passed |
| Missing JWT token | Passed |
| Invalid JWT token | Passed |
| Expired JWT token | Passed |
| Tampered JWT token | Passed |
| Successful login | Passed |
| Authenticated user profile | Passed |
| Total automated tests | 15 Passed, 0 Failed |

### Learning Outcome
Learned how to test JWT authentication security and reject missing, invalid, expired, and tampered authentication tokens.

**Status: Completed**
