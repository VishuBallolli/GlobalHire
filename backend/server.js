require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const pool = require("./db");

const app = express();
app.use(express.json());
const PORT = 3000;

app.get("/", function(req, res) {
    res.send("Welcome to GlobalHire Backend!");
});

app.get("/api/jobs", async function(req, res) {
    try {
        // Query the database for all jobs
        const [rows] = await pool.query(
            "SELECT id, title, country, salary FROM jobs ORDER BY id"
        );
        
        // Return the jobs as JSON
        res.json(rows);
    } catch (error) {
        // Log the error for debugging
        console.error("Database error:", error.message);
        
        // Return a safe error message to the client
        res.status(500).json({
            status: "error",
            message: "Failed to retrieve jobs from database"
        });
    }
});


app.get("/api/jobs/:id", async (req, res) => {
    try {
        const jobId = req.params.id;

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
        console.error("Database error:", error.message);

        return res.status(500).json({
            status: "error",
            message: "Failed to retrieve job from database"
        });
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


app.post("/api/jobs", async (req, res) => {
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
        // Log the error for debugging
        console.error("Database error:", error.message);

        // Return a safe error message to the client
        return res.status(500).json({
            status: "error",
            message: "Failed to create job in database"
        });
    }
});

app.put("/api/jobs/:id", async (req, res) => {
    try {
        const jobId = req.params.id;
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
                id: parseInt(jobId),
                title: title.trim(),
                country: country.trim(),
                salary: salaryValue
            }
        });
    } catch (error) {
        // Log the error for debugging
        console.error("Database error:", error.message);

        // Return a safe error message to the client
        return res.status(500).json({
            status: "error",
            message: "Failed to update job in database"
        });
    }
});

app.delete("/api/jobs/:id", async (req, res) => {
    try {
        const jobId = req.params.id;

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
        // Log the error for debugging
        console.error("Database error:", error.message);

        // Return a safe error message to the client
        return res.status(500).json({
            status: "error",
            message: "Failed to delete job from database"
        });
    }
});


app.listen(PORT, function() {
    console.log(`GlobalHire server running at http://localhost:${PORT}`);
});







