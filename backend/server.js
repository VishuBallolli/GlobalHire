const express = require("express");

const app = express();

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

app.get("/api/health", function(req, res) {
    res.json({
        status: "success",
        message: "GlobalHire API is running"
    });
});

app.listen(PORT, function() {
    console.log(`GlobalHire server running at http://localhost:${PORT}`);
});