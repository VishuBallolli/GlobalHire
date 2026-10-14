# GlobalHire

GlobalHire is an international job and recruitment platform.

## Project Goal

Build a platform where job seekers can find international job opportunities and employers can post jobs and manage applicants.

## User Roles

1. **Job Seeker** — Search for jobs, manage a profile, and track applications.
2. **Employer** — Post jobs, manage listings, and review applicants.
3. **Admin** — Manage users, companies, jobs, and applications.

## Technologies

**Frontend**
- HTML
- CSS
- Bootstrap
- JavaScript

**Backend**
- Node.js
- Express.js

**Database**
- MySQL (integration pending)

**Testing**
- Postman

**Additional Tools and Technologies**
- Python (planned for future features)
- Git and GitHub

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
- Practiced using Node.js and npm commands.
- Created and executed `backend/hello.js`.
- Learned the purpose of `package.json`, npm scripts, and dependencies.

### Day 9 — Express.js and First Backend API
- Installed Express.js in the backend project.
- Created an Express server in `backend/server.js`.
- Implemented a welcome route at `/`.
- Created `GET /api/jobs` to return sample job listings as JSON.
- Created `GET /api/health` to check server status.
- Tested the server locally in a browser.
- Committed and pushed the backend changes to GitHub.

### Day 10 — HTTP Methods, REST APIs, and Postman
- Learned HTTP and client-server communication.
- Studied the HTTP methods `GET`, `POST`, `PUT`, `PATCH`, and `DELETE`.
- Learned REST API routes and HTTP status codes, including `200`, `201`, `400`, `401`, `404`, and `500`.
- Practiced understanding URL components, including protocol, host, port, and path.
- Tested `GET /api/health` using Postman.
- Tested `GET /api/jobs` using Postman.
- Inspected the JSON responses and verified that the existing endpoints worked.
- Checked Git status and confirmed the local repository was synchronized with GitHub.

## Current Project Status

- Responsive frontend built with HTML, CSS, Bootstrap, and JavaScript.
- Node.js and Express.js backend running locally.
- Sample job listings currently returned as hardcoded JSON.
- Health-check endpoint available.
- MySQL database integration is pending.
- Full CRUD operations, authentication, and authorization are pending.
- Python-based job matching and recommendation features are planned for a future phase.

## Planned Next Steps

1. Learn route parameters, query parameters, and request bodies.
2. Implement and test additional REST API operations.
3. Integrate MySQL with the Node.js backend.
4. Build complete job CRUD functionality.
5. Add authentication, authorization, and input validation.
6. Expand automated and manual API testing.
7. Develop future Python-based job-matching features.
8. Improve deployment, documentation, and security.

## Repository

GitHub: https://github.com/VishuBallolli/GlobalHire 

### Day 12 — MySQL Database Fundamentals

- Started MySQL using XAMPP and opened phpMyAdmin.
- Created the `globalhire_db` database.
- Created the `jobs` table with `id`, `title`, `country`, and `salary` columns.
- Configured `id` as the primary key with auto-increment.
- Inserted sample job records using `INSERT INTO`.
- Retrieved job records using `SELECT`.
- Verified that the database stores and returns records successfully.

**Next:** Learn SQL filtering and modification, then connect MySQL to the Node.js/Express backend.