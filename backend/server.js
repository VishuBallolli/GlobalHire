const express = require("express");

const app = express();
app.use(express.json());
const PORT = 3000;

app.get("/", function(req, res) {
    res.send("Welcome to GlobalHire Backend!");
});

app.get("/api/jobs", function(req, res) {
    res.json([
        {
            id: 1,
            title: "Python Developer",
            country: "Canada"
        },
        {
            id: 2,
            title: "Software Developer",
            country: "Germany"
        }
    ]);
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







