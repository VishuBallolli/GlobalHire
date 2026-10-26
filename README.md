# GlobalHire 🌍

**An International Job Search and Recruitment Platform**

GlobalHire is a learning-driven full-stack web application designed to connect job seekers with international job opportunities and help employers manage job listings and applicants.

## Project Goal

Build a responsive, secure, and scalable platform where:

- Job seekers can discover international opportunities, manage profiles, and track applications.
- Employers can publish job listings and review applicants.
- Administrators can manage users, companies, jobs, and applications.

## User Roles

1. **Job Seeker** — Search for jobs, manage a profile, and track applications.
2. **Employer** — Post jobs, manage listings, and review applicants.
3. **Admin** — Manage users, companies, jobs, and applications.

## Technologies

**Frontend**
- HTML5
- CSS3
- Bootstrap 5
- JavaScript

**Backend**
- Node.js
- Express.js
- REST API development
- `mysql2/promise` for MySQL connectivity
- `dotenv` for environment configuration

**Database**
- MySQL
- XAMPP and phpMyAdmin for local database management
- SQL queries and parameterized database operations

**Testing and Developer Tools**
- Postman
- Git and GitHub
- Git Bash
- VS Code / Kiro

**Planned Technologies**
- TypeScript, React, and Next.js
- Automated testing
- Docker and CI/CD
- Cloud deployment
- Python-based job matching and AI-powered features

## Development Progress

### Day 1 — Project Setup
- Created the GlobalHire project structure.
- Organized frontend, backend, database, documentation, and Python-service folders.
- Initialized Git and connected the project to GitHub.

### Day 2 — HTML Fundamentals
- Learned the basic HTML document structure.
- Practiced headings, paragraphs, links, images, lists, tables, and forms.
- Used semantic HTML elements and form attributes.

### Day 3 — CSS Fundamentals
- Learned selectors, colors, typography, spacing, and the CSS box model.
- Practiced margins, padding, borders, and layout properties.
- Used Flexbox and responsive media queries.
- Styled the GlobalHire homepage.

### Day 4 — Bootstrap
- Integrated Bootstrap into the frontend.
- Practiced containers, rows, columns, and responsive grid layouts.
- Used Bootstrap components, buttons, cards, forms, and utility classes.
- Improved the responsive layout.

### Day 5 — JavaScript Fundamentals and DOM Events
- Learned variables, data types, functions, conditions, loops, arrays, and objects.
- Practiced DOM selection and manipulation.
- Learned click, input, change, and submit events.
- Practiced `addEventListener()` and `event.preventDefault()`.
- Built job search interactions and form validation.

### Day 6 — Frontend Testing
- Tested the homepage and job search functionality.
- Checked form validation and user interactions.
- Verified responsive layouts on different screen sizes.
- Inspected browser console errors and corrected issues.

### Day 7 — Accessibility and Frontend Improvements
- Improved frontend accessibility and usability.
- Practiced semantic HTML and meaningful image alternative text.
- Improved responsive layouts and search behavior.
- Tested matching and non-matching job search results.
- Reviewed code quality and Git changes.

### Day 8 — Node.js Fundamentals
- Learned the role of Node.js in backend development.
- Compared browser JavaScript with Node.js.
- Practiced Node.js and npm commands.
- Created and executed `backend/hello.js`.
- Learned the purpose of `package.json`, npm scripts, and dependencies.

### Day 9 — Express.js and First Backend API
- Installed Express.js in the backend project.
- Created an Express server in `backend/server.js`.
- Implemented a welcome route at `/`.
- Created `GET /api/jobs` to return sample job listings as JSON.
- Created `GET /api/health` to check server status.
- Tested the server locally.

### Day 10 — HTTP Methods, REST APIs, and Postman
- Learned HTTP and client-server communication.
- Studied `GET`, `POST`, `PUT`, `PATCH`, and `DELETE`.
- Practiced REST API routes and HTTP status codes, including `200`, `201`, `400`, `401`, `404`, and `500`.
- Learned URL components, including protocol, host, port, and path.
- Tested backend endpoints using Postman.
- Inspected JSON responses and verified endpoint behavior.

### Day 11 — Express Request Handling
- Practiced Express route parameters and query parameters.
- Learned how to read request bodies using `express.json()`.
- Implemented job-related API routes.
- Practiced sending JSON responses and using appropriate HTTP status codes.
- Tested requests and responses using Postman.

### Day 12 — MySQL Database Fundamentals
- Started MySQL using XAMPP and opened phpMyAdmin.
- Created the `globalhire_db` database.
- Created the `jobs` table with `id`, `title`, `country`, and `salary` columns.
- Configured `id` as an auto-incrementing primary key.
- Inserted sample job records using `INSERT INTO`.
- Retrieved job records using `SELECT`.
- Exported the database structure and sample data for the project.

### Day 13 — SQL Data Manipulation
- Practiced filtering records using `WHERE`.
- Sorted job records using `ORDER BY`, `ASC`, and `DESC`.
- Practiced salary comparisons and conditional queries.
- Learned how `UPDATE` modifies records and `DELETE` removes records.
- Studied the importance of `WHERE` clauses to avoid unintended data changes.

### Day 14 — Node.js and MySQL Integration
- Installed `mysql2` and `dotenv` in the backend.
- Created `backend/db.js` to configure a reusable MySQL connection pool.
- Configured database connection settings through environment variables.
- Kept local `.env` configuration excluded from Git.
- Created `backend/test-db.js` to verify the database connection.
- Successfully connected the Express backend to `globalhire_db`.
- Updated `GET /api/jobs` to retrieve actual job records from MySQL.
- Added database error handling and tested the endpoint using Postman.

### Day 15 — Database-Backed CRUD APIs
- Implemented database-backed job creation using `POST /api/jobs`.
- Implemented job retrieval using `GET /api/jobs` and `GET /api/jobs/:id`.
- Implemented job updates using `PUT /api/jobs/:id`.
- Implemented job deletion using `DELETE /api/jobs/:id`.
- Used parameterized SQL queries for database operations.
- Added input validation for job title, country, and salary.
- Practiced handling `400`, `404`, and `500` responses.
- Verified that created and updated records persist in MySQL.
- Confirmed that deleted jobs return `404 Not Found` when retrieved.
- Tested deletion of nonexistent jobs using Postman.
- Committed the implementation with Git.


### Day 24 — JWT Authentication, User Profile, and Logout

- Integrated the frontend login form with the backend login API.
- Stored the JWT authentication token in `sessionStorage` after successful login.
- Protected `GET /api/auth/me` using JWT authentication middleware.
- Retrieved the authenticated user's ID, name, and email from MySQL.
- Displayed the logged-in user's profile in the frontend.
- Verified that requests without a token return `401 Unauthorized`.
- Verified that requests with a valid token return `200 OK` and user details.
- Implemented frontend logout by removing the stored token and hiding the profile.
- Tested login, profile retrieval, and logout.
- Committed and pushed the changes to GitHub.

### Day 25 — JWT Authentication Regression Testing

**Completed tests**
- Login endpoint: `POST /api/auth/login` — `200 OK` with valid credentials.
- Protected profile endpoint: `GET /api/auth/me` — `200 OK` with a valid Bearer token.
- Missing or invalid authentication token — `401 Unauthorized`.
- Profile request without a token after logout — `401 Unauthorized`.
- Verified the authenticated user's ID, name, and email were returned correctly.
- Reviewed JWT authentication middleware and restarted the backend for regression testing.
- Verified that Local Storage and Session Storage were empty after logout.
- Reviewed the frontend logout handler: it removes the stored token, hides the user profile, and displays a success message.

**Result:** Login, protected profile access, and client-side logout checks passed.

**Security note:** Clearing browser storage removes the locally stored token, but it does not revoke a copied JWT unless server-side token revocation is implemented.

**Next steps:** Review any remaining authentication security checks before marking Day 25 complete.

## Current Project Status

**Completed and practiced**

- Responsive frontend using HTML, CSS, Bootstrap, and JavaScript.
- Local Node.js and Express backend.
- MySQL database setup and connection.
- Database-backed job listing and individual job retrieval.
- Job creation, updating, and deletion through REST APIs.
- Basic request validation and error handling.
- Manual API testing using Postman.
- Git-based version control and GitHub workflow.
- User registration and login APIs.
- JWT-based authentication for protected endpoints.
- Authenticated user profile retrieval from MySQL.
- Frontend login, profile display, and logout integration.

**Not yet implemented or planned**

- Job seeker and employer account management.
- Persistent application tracking and applicant management.
- Automated unit, integration, and end-to-end tests.
- Production deployment, Docker, and CI/CD.
- Role-based authorization, advanced security, logging, and monitoring.
- Python-based job matching and AI-assisted recommendations.

The current implementation is a learning-stage project. Features will be expanded and tested incrementally as development continues..

## Planned Next Steps


## Planned Next Steps

1. Test invalid and expired JWTs, and improve authentication error handling.
2. Improve job ID validation and handle invalid route parameters.
3. Add automated tests for backend routes and database operations.
4. Improve database schema design and learn SQL joins, indexes, and transactions.
5. Implement and test role-based authorization.
6. Develop job seeker profiles, employer workflows, and application management.
7. Learn TypeScript and React for a more advanced frontend.
8. Add Docker, GitHub Actions CI/CD, and cloud deployment.
9. Explore Python-based matching, AI integration, and recommendation features.
10. Improve documentation, architecture, accessibility, and performance.


## Repository Structure

```text
GlobalHire/
├── frontend/
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── test-db.js
│   ├── package.json
│   └── .env                 # Local configuration; do not commit
├── database/
├── docs/
├── python-service/
├── .gitignore
└── README.md
```

*Note: The structure may evolve as new features and tests are added.*

## Running the Backend Locally

### Prerequisites
- Node.js and npm
- XAMPP with MySQL
- The `globalhire_db` database and `jobs` table

### Setup

1. Start MySQL in XAMPP.
2. Configure the local environment variables in `backend/.env`.
3. Install backend dependencies if needed:

   ```bash
   npm install --prefix backend
   ```

4. Start the backend from the project root:

   ```bash
   npm start --prefix backend
   ```

5. Test the API using Postman:

   ```text
   GET http://localhost:3000/api/health
   GET http://localhost:3000/api/jobs
   GET http://localhost:3000/api/jobs/1
   ```

**Important:** Do not commit `.env` files, database passwords, or other secrets to GitHub.

## Learning Approach

GlobalHire is being developed incrementally as a practical software-engineering learning project. Each stage focuses on understanding the concepts, implementing working features, testing behavior, documenting changes, and using Git to track progress.

The longer-term goal is to develop strong full-stack engineering skills, including testing, DevOps, cloud deployment, security, and maintainable software design.

## Repository

GitHub: [VishuBallolli/GlobalHire](https://github.com/VishuBallolli/GlobalHire)
