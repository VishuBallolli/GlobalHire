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


app.get("/api/jobs/:id", (req, res) => {
    const jobId = req.params.id;

    res.json({
        message: "Job fetched successfully",
        id: jobId
    });
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


app.post("/api/jobs", (req, res) => {
    const job = req.body;

    res.status(201).json({
        message: "Job received successfully",
        data: job
    });
});


app.listen(PORT, function() {
    console.log(`GlobalHire server running at http://localhost:${PORT}`);
});







