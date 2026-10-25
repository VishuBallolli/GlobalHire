require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const pool = require("./db");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json({ strict: false }));

app.use(express.static(path.join(__dirname, "../frontend")));

const PORT = 3000;

/**
 * Validates that a job ID is a positive integer.
 */


function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            status: "error",
            message: "Authentication token required"
        });
    }

    const token = authHeader.slice(7).trim();

    if (!token) {
        return res.status(401).json({
            status: "error",
            message: "Authentication token required"
        });
    }

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({
            status: "error",
            message: "Authentication is not configured"
        });
    }

    jwt.verify(
        token,
        process.env.JWT_SECRET,
        {
            issuer: "globalhire",
            audience: "globalhire-users"
        },
        (error, decoded) => {
            if (error) {
                return res.status(401).json({
                    status: "error",
                    message: "Invalid or expired authentication token"
                });
            }

            req.user = {
                id: decoded.sub,
                email: decoded.email
            };

            next();
        }
    );
}


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


app.get("/api/auth/me", authenticateToken, (req, res) => {
    return res.status(200).json({
        status: "success",
        message: "Authentication verified",
        data: {
            id: req.user.id,
            email: req.user.email
        }
    });
});



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


app.post("/api/auth/register", async (req, res, next) => {
    try {
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

        const { name, email, password } = req.body;

        if (
            typeof name !== "string" ||
            name.trim().length < 2 ||
            name.trim().length > 100
        ) {
            return res.status(400).json({
                status: "error",
                message: "Name must be between 2 and 100 characters"
            });
        }

        if (
            typeof email !== "string" ||
            email.trim().length > 255 ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
        ) {
            return res.status(400).json({
                status: "error",
                message: "Please provide a valid email address"
            });
        }

        if (
            typeof password !== "string" ||
            password.length < 8 ||
            password.length > 72
        ) {
            return res.status(400).json({
                status: "error",
                message: "Password must be between 8 and 72 characters"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const [existingUsers] = await pool.execute(
            "SELECT id FROM users WHERE email = ?",
            [normalizedEmail]
        );

        if (existingUsers.length > 0) {
            return res.status(409).json({
                status: "error",
                message: "An account with this email already exists"
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const [result] = await pool.execute(
            "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
            [name.trim(), normalizedEmail, passwordHash]
        );

        return res.status(201).json({
            status: "success",
            message: "Registration successful",
            data: {
                id: result.insertId,
                name: name.trim(),
                email: normalizedEmail
            }
        });
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                status: "error",
                message: "An account with this email already exists"
            });
        }

        next(error);
    }
});


app.post("/api/auth/login", async (req, res, next) => {
    try {
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

        const { email, password } = req.body;

        if (
            typeof email !== "string" ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
            email.trim().length > 255
        ) {
            return res.status(400).json({
                status: "error",
                message: "Please provide a valid email address"
            });
        }

        if (
            typeof password !== "string" ||
            password.length === 0 ||
            password.length > 72
        ) {
            return res.status(400).json({
                status: "error",
                message: "Please provide a valid password"
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const [users] = await pool.execute(
            "SELECT id, name, email, password_hash FROM users WHERE email = ?",
            [normalizedEmail]
        );

        if (users.length === 0) {
            return res.status(401).json({
                status: "error",
                message: "Invalid email or password"
            });
        }

        const user = users[0];
        const passwordMatches = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordMatches) {
            return res.status(401).json({
                status: "error",
                message: "Invalid email or password"
            });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                status: "error",
                message: "Authentication is not configured"
            });
        }

        const token = jwt.sign(
            { email: user.email },
            process.env.JWT_SECRET,
            {
                subject: String(user.id),
                expiresIn: "1h",
                issuer: "globalhire",
                audience: "globalhire-users"
            }
        );

        return res.status(200).json({
            status: "success",
            message: "Login successful",
            data: {
                token,
                tokenType: "Bearer",
                expiresIn: 3600,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            }
        });
    } catch (error) {
        next(error);
    }
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
    console.error("Error code:", err.code);
    console.error("Underlying errors:", err.errors);
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
