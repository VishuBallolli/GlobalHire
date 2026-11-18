
const { test, after } = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");

const app = require("../server");
const pool = require("../db");

// Test 1: Health API
test("GET /api/health should return success", async () => {
    const response = await request(app).get("/api/health");

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "success");
    assert.equal(
        response.body.message,
        "GlobalHire API is running"
    );
});

// Test 2: Get all jobs
test("GET /api/jobs should return a list of jobs", async () => {
    const response = await request(app).get("/api/jobs");

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(response.body));
});


// Test 3: Get a job using a valid ID
test("GET /api/jobs/:id should return a job", async () => {
    const response = await request(app).get("/api/jobs/1");

    assert.equal(response.status, 200);
    assert.equal(response.body.id, 1);
    assert.ok(response.body.title);
});

// Test 4: Reject an invalid job ID
test("GET /api/jobs/:id should reject an invalid ID", async () => {
    const response = await request(app).get("/api/jobs/abc");

    assert.equal(response.status, 400);
    assert.equal(response.body.status, "error");
    assert.equal(
        response.body.message,
        "Job ID must be a positive integer"
    );
});

// Test 5: Return 404 when a job does not exist
test("GET /api/jobs/:id should return 404 for a missing job", async () => {
    const response = await request(app).get("/api/jobs/999999");

    assert.equal(response.status, 404);
    assert.equal(response.body.status, "error");
    assert.equal(response.body.message, "Job not found");
});

// Close MySQL connection pool after tests
after(async () => {
    await pool.end();
});
