require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const pool = require("./db");

const app = express();
app.use(express.json());
const PORT = 3000;

/**
 * Validates that a job ID is a positive integer
 * @param {string} id - The ID from req.params.id
 * @returns {object|null} - Returns error response object if invalid, null if valid
 */
function validateJobId(id) {
    // Convert to number and check if it's a positive integer
    const numId = Number(id);

    // Check for: NaN, non-integer, zero, negative, or Infinity
    if (!Number.isInteger(numId) || numId <= 0 || !Number.isFinite(numId)) {
        return {
            status: 400,
            json: {
                status: "error",
                message: "Job ID must be a positive integer"
            }
        };
    }

    return null; // Valid ID
}

app.get("/", function(req, res) {
    res.send("Welcome to GlobalHire Backend!");
});

app.get("/api/jobs", async function(req, res, next) {
    try {
        // Query the database for all jobs
        const [rows] = await pool.query(
            "SELECT id, title, country, salary FROM jobs ORDER BY id"
        );

        // Return the jobs as JSON
        res.json(rows);
    } catch (error) {
        next(error);
    }
});


app.get("/api/jobs/:id", async (req, res, next) => {
    try {
        // Validate ID first
        const validationError = validateJobId(req.params.id);
        if (validationError) {
            return res.status(validationError.status).json(validationError.json);
        }

        const jobId = Number(req.params.id);

        const [rows] = await pool.execute(
            "SELECT id, title, country, salary FROM jobs WHERE id = ?",
            [jobId]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Job not found"
            });
        }

        return res.status(200).json(rows[0]);
    } catch (error) {
        next(error);
    }
});

app.get("/api/search", (req, res) => {
    const title = req.query.title;
    const country = req.query.country;

    res.json({
        message: "Search filters received successfully",
        title: title,
        country: country
    });
});

app.get("/api/health", function(req, res) {
    res.json({
        status: "success",
        message: "GlobalHire API is running"
    });
});


app.post("/api/jobs", async (req, res, next) => {
    try {
        const { title, country, salary } = req.body;

        // Validate title (required, non-empty string)
        if (!title || typeof title !== 'string' || title.trim() === '') {
            return res.status(400).json({
                status: "error",
                message: "Title is required and must be a non-empty string"
            });
        }

        // Validate country (required, non-empty string)
        if (!country || typeof country !== 'string' || country.trim() === '') {
            return res.status(400).json({
                status: "error",
                message: "Country is required and must be a non-empty string"
            });
        }

        // Validate salary (optional, but if provided must be a finite non-negative number, not a string)
        let salaryValue = null;
        if (salary !== null && salary !== undefined) {
            if (typeof salary === 'string') {
                return res.status(400).json({
                    status: "error",
                    message: "Salary must be a number, not a string"
                });
            }
            if (typeof salary !== 'number' || !Number.isFinite(salary) || salary < 0) {
                return res.status(400).json({
                    status: "error",
                    message: "Salary must be null or a finite, non-negative number"
                });
            }
            salaryValue = salary;
        }

        // Insert the new job into the database
        const [result] = await pool.execute(
            "INSERT INTO jobs (title, country, salary) VALUES (?, ?, ?)",
            [title.trim(), country.trim(), salaryValue]
        );

        // Return success response with the new job ID
        return res.status(201).json({
            status: "success",
            message: "Job created successfully",
            data: {
                id: result.insertId,
                title: title.trim(),
                country: country.trim(),
                salary: salaryValue
            }
        });
    } catch (error) {
        next(error);
    }
});

app.put("/api/jobs/:id", async (req, res, next) => {
    try {
        // Validate ID first
        const validationError = validateJobId(req.params.id);
        if (validationError) {
            return res.status(validationError.status).json(validationError.json);
        }

        const jobId = Number(req.params.id);
        const { title, country, salary } = req.body;

        // Validate title (required, non-empty string)
        if (!title || typeof title !== 'string' || title.trim() === '') {
            return res.status(400).json({
                status: "error",
                message: "Title is required and must be a non-empty string"
            });
        }

        // Validate country (required, non-empty string)
        if (!country || typeof country !== 'string' || country.trim() === '') {
            return res.status(400).json({
                status: "error",
                message: "Country is required and must be a non-empty string"
            });
        }

        // Validate salary (optional, but if provided must be a finite non-negative number, not a string)
        let salaryValue = null;
        if (salary !== null && salary !== undefined) {
            if (typeof salary === 'string') {
                return res.status(400).json({
                    status: "error",
                    message: "Salary must be a number, not a string"
                });
            }
            if (typeof salary !== 'number' || !Number.isFinite(salary) || salary < 0) {
                return res.status(400).json({
                    status: "error",
                    message: "Salary must be null or a finite, non-negative number"
                });
            }
            salaryValue = salary;
        }

        // First, check if the job exists
        const [existingRows] = await pool.execute(
            "SELECT id FROM jobs WHERE id = ?",
            [jobId]
        );

        if (existingRows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Job not found"
            });
        }

        // Update the job in the database
        await pool.execute(
            "UPDATE jobs SET title = ?, country = ?, salary = ? WHERE id = ?",
            [title.trim(), country.trim(), salaryValue, jobId]
        );

        // Return success response with the updated job data
        return res.status(200).json({
            status: "success",
            message: "Job updated successfully",
            data: {
                id: jobId,
                title: title.trim(),
                country: country.trim(),
                salary: salaryValue
            }
        });
    } catch (error) {
        next(error);
    }
});

app.delete("/api/jobs/:id", async (req, res, next) => {
    try {
        // Validate ID first
        const validationError = validateJobId(req.params.id);
        if (validationError) {
            return res.status(validationError.status).json(validationError.json);
        }

        const jobId = Number(req.params.id);

        // First, check if the job exists
        const [existingRows] = await pool.execute(
            "SELECT id FROM jobs WHERE id = ?",
            [jobId]
        );

        if (existingRows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Job not found"
            });
        }

        // Delete the job from the database
        await pool.execute(
            "DELETE FROM jobs WHERE id = ?",
            [jobId]
        );

        // Return success response
        return res.status(200).json({
            status: "success",
            message: "Job deleted successfully"
        });
    } catch (error) {
        next(error);
    }
});

/**
 * Centralized error-handling middleware
 * Must have 4 parameters (err, req, res, next) for Express to recognize it as error handler
 */
app.use((err, req, res, next) => {
    // Log detailed error information server-side for debugging
    console.error("=== Error Details ===");
    console.error("Message:", err.message);
    console.error("Stack:", err.stack);
    console.error("Request:", req.method, req.url);
    console.error("====================");

    // Send safe, generic error response to client
    // Never expose stack traces, SQL queries, or database connection details
    res.status(500).json({
        status: "error",
        message: "An unexpected error occurred"
    });
});

app.listen(PORT, function() {
    console.log(`GlobalHire server running at http://localhost:${PORT}`);
});
