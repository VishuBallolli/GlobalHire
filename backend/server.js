require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const pool = require("./db");

const app = express();
app.use(express.json({ strict: false }));
const PORT = 3000;

/**
 * Validates that a job ID is a positive integer.
 */

function validateJobId(id) {
    const numId = Number(id);

    if (!Number.isSafeInteger(numId) || numId <= 0) {
        return {
            status: 400,
            json: {
                status: "error",
                message: "Job ID must be a positive integer"
            }
        };
    }

    return null;
}


app.get("/", function(req, res) {
    res.send("Welcome to GlobalHire Backend!");
});

app.get("/api/jobs", async function(req, res, next) {
    try {
        const [rows] = await pool.query(
            "SELECT id, title, country, salary FROM jobs ORDER BY id"
        );

        res.json(rows);
    } catch (error) {
        next(error);
    }
});



app.get("/api/jobs/:id", async (req, res, next) => {
    try {
        const validationError = validateJobId(req.params.id);

        if (validationError) {
            return res
                .status(validationError.status)
                .json(validationError.json);
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



app.get("/api/search", async (req, res, next) => {
    try {
        const title = req.query.title?.trim() || undefined;
        const country = req.query.country?.trim() || undefined;

        let sql = "SELECT id, title, country, salary FROM jobs";
        const params = [];
        const conditions = [];

        if (title) {
            conditions.push("title LIKE ?");
            params.push(`%${title}%`);
        }

        if (country) {
            conditions.push("country LIKE ?");
            params.push(`%${country}%`);
        }

        if (conditions.length > 0) {
            sql += " WHERE " + conditions.join(" AND ");
        }

        sql += " ORDER BY id";

        const [rows] = await pool.query(sql, params);

        return res.status(200).json(rows);
    } catch (error) {
        next(error);
    }
});


app.get("/api/health", function(req, res) {
    res.json({
        status: "success",
        message: "GlobalHire API is running"
    });
});

app.post("/api/jobs", async (req, res, next) => {
    try {
        // Ensure the request body is a JSON object.
        if (
            req.body === null ||
            typeof req.body !== "object" ||
            Array.isArray(req.body)
        ) {
            return res.status(400).json({
                status: "error",
                message: "Request body must be a JSON object"
            });
        }

        const { title, country, salary } = req.body;
        if (!title || typeof title !== 'string' || title.trim() === '') {
            return res.status(400).json({
                status: "error",
                message: "Title is required and must be a non-empty string"
            });
        }

        if (!country || typeof country !== 'string' || country.trim() === '') {
            return res.status(400).json({
                status: "error",
                message: "Country is required and must be a non-empty string"
            });
        }

        let salaryValue = null;

        if (salary !== null && salary !== undefined) {
            if (typeof salary === "string") {
                return res.status(400).json({
                    status: "error",
                    message: "Salary must be a number, not a string"
                });
            }

            if (
                typeof salary !== "number" ||
                !Number.isFinite(salary) ||
                salary < 0
            ) {
                return res.status(400).json({
                    status: "error",
                    message: "Salary must be null or a finite, non-negative number"
                });
            }

            salaryValue = salary;
        }

        const [result] = await pool.execute(
            "INSERT INTO jobs (title, country, salary) VALUES (?, ?, ?)",
            [title.trim(), country.trim(), salaryValue]
        );

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
        const validationError = validateJobId(req.params.id);

        if (validationError) {
            return res.status(validationError.status).json(validationError.json);
        }

        // Ensure the request body is a JSON object.
        if (
            req.body === null ||
            typeof req.body !== "object" ||
            Array.isArray(req.body)
        ) {
            return res.status(400).json({
                status: "error",
                message: "Request body must be a JSON object"
            });
        }

        const jobId = Number(req.params.id);
        const { title, country, salary } = req.body;

        if (!title || typeof title !== "string" || title.trim() === "") {
            return res.status(400).json({
                status: "error",
                message: "Title is required and must be a non-empty string"
            });
        }

        if (!country || typeof country !== "string" || country.trim() === "") {
            return res.status(400).json({
                status: "error",
                message: "Country is required and must be a non-empty string"
            });
        }

        let salaryValue = null;

        if (salary !== null && salary !== undefined) {
            if (typeof salary === "string") {
                return res.status(400).json({
                    status: "error",
                    message: "Salary must be a number, not a string"
                });
            }

            if (
                typeof salary !== "number" ||
                !Number.isFinite(salary) ||
                salary < 0
            ) {
                return res.status(400).json({
                    status: "error",
                    message: "Salary must be null or a finite, non-negative number"
                });
            }

            salaryValue = salary;
        }

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

        await pool.execute(
            "UPDATE jobs SET title = ?, country = ?, salary = ? WHERE id = ?",
            [title.trim(), country.trim(), salaryValue, jobId]
        );

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
        const validationError = validateJobId(req.params.id);

        if (validationError) {
            return res.status(validationError.status).json(validationError.json);
        }

        const jobId = Number(req.params.id);

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

        await pool.execute(
            "DELETE FROM jobs WHERE id = ?",
            [jobId]
        );

        return res.status(200).json({
            status: "success",
            message: "Job deleted successfully"
        });
    } catch (error) {
        next(error);
    }
});

/**
 * Centralized error-handling middleware.
 */
app.use((err, req, res, next) => {
    // Handle malformed JSON separately.
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({
            status: "error",
            message: "Invalid JSON request body"
        });
    }

    console.error("=== Error Details ===");
    console.error("Message:", err.message);
    console.error("Stack:", err.stack);
    console.error("Request:", req.method, req.url);
    console.error("====================");

    if (res.headersSent) {
        return next(err);
    }

    return res.status(500).json({
        status: "error",
        message: "An unexpected error occurred"
    });
});

app.listen(PORT, function() {
    console.log(`GlobalHire server running at http://localhost:${PORT}`);
});
