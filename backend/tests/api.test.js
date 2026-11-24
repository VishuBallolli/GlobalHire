
const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../server");
const pool = require("../db");

// Day 47: Temporary authentication test user
const testUser = {
    name: "GlobalHire Day47 Tester",
    email: "globalhire.day47.test@example.com",
    password: "Day47TestPassword123"
};

let testUserId;
let authToken;

// Create a temporary user before authentication tests
before(async () => {
    const response = await request(app)
        .post("/api/auth/register")
        .send(testUser);

    assert.equal(response.status, 201);
    assert.equal(response.body.status, "success");

    testUserId = response.body.data.id;
});

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

// Test 6: Search all jobs without filters
test("GET /api/search should return all jobs", async () => {
    const response = await request(app).get("/api/search");

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(response.body));
});

// Test 7: Reject request without authentication token
test("GET /api/auth/me should reject requests without a token", async () => {
    const response = await request(app).get("/api/auth/me");

    assert.equal(response.status, 401);
    assert.equal(response.body.status, "error");
    assert.equal(
        response.body.message,
        "Authentication token required"
    );
});

// Test 8: Reject an invalid authentication token
test("GET /api/auth/me should reject an invalid token", async () => {
    const response = await request(app)
        .get("/api/auth/me")
        .set("Authorization", "Bearer invalid-token");

    assert.equal(response.status, 401);
    assert.equal(response.body.status, "error");
    assert.equal(
        response.body.message,
        "Invalid or expired authentication token"
    );
});

// Test 9: Reject an expired authentication token
test("GET /api/auth/me should reject an expired token", async () => {
    const expiredToken = jwt.sign(
        { email: testUser.email },
        process.env.JWT_SECRET,
        {
            subject: String(testUserId),
            expiresIn: -1,
            issuer: "globalhire",
            audience: "globalhire-users"
        }
    );

    const response = await request(app)
        .get("/api/auth/me")
        .set("Authorization", "Bearer " + expiredToken);

    assert.equal(response.status, 401);
    assert.equal(response.body.status, "error");
    assert.equal(
        response.body.message,
        "Invalid or expired authentication token"
    );
});

// Test 10: Reject a tampered authentication token
test("GET /api/auth/me should reject a tampered token", async () => {
    const validToken = jwt.sign(
        { email: testUser.email },
        process.env.JWT_SECRET,
        {
            subject: String(testUserId),
            expiresIn: "1h",
            issuer: "globalhire",
            audience: "globalhire-users"
        }
    );
const tokenParts = validToken.split(".");

tokenParts[2] =
    (tokenParts[2][0] === "a" ? "b" : "a") +
    tokenParts[2].slice(1);

const tamperedToken = tokenParts.join(".");
    const response = await request(app)
        .get("/api/auth/me")
        .set("Authorization", "Bearer " + tamperedToken);

    assert.equal(response.status, 401);
    assert.equal(response.body.status, "error");
    assert.equal(
        response.body.message,
        "Invalid or expired authentication token"
    );
});

// Test 11: Reject login with an invalid email
test("POST /api/auth/login should reject an invalid email", async () => {
    const response = await request(app)
        .post("/api/auth/login")
        .send({
            email: "invalid-email",
            password: "Password123"
        });

    assert.equal(response.status, 400);
    assert.equal(response.body.status, "error");
    assert.equal(
        response.body.message,
        "Please provide a valid email address"
    );
});

// Test 12: Reject login with an empty password
test("POST /api/auth/login should reject an empty password", async () => {
    const response = await request(app)
        .post("/api/auth/login")
        .send({
            email: "test@example.com",
            password: ""
        });

    assert.equal(response.status, 400);
    assert.equal(response.body.status, "error");
    assert.equal(
        response.body.message,
        "Please provide a valid password"
    );
});

// Test 13: Successful login should return a JWT token
test("POST /api/auth/login should successfully log in a user", async () => {
    const response = await request(app)
        .post("/api/auth/login")
        .send({
            email: testUser.email,
            password: testUser.password
        });

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "success");
    assert.equal(response.body.message, "Login successful");

    assert.ok(response.body.data.token);
    assert.equal(response.body.data.tokenType, "Bearer");
    assert.equal(response.body.data.expiresIn, 3600);

    assert.equal(response.body.data.user.id, testUserId);
    assert.equal(response.body.data.user.name, testUser.name);
    assert.equal(response.body.data.user.email, testUser.email);

    authToken = response.body.data.token;
});

// Test 14: Access profile using a valid JWT token
test("GET /api/auth/me should return the authenticated user profile", async () => {
    const response = await request(app)
        .get("/api/auth/me")
        .set("Authorization", "Bearer " + authToken);

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "success");
    assert.equal(response.body.message, "Authentication verified");

    assert.equal(response.body.data.id, testUserId);
    assert.equal(response.body.data.name, testUser.name);
    assert.equal(response.body.data.email, testUser.email);
});

// Clean up temporary test user and close database pool
after(async () => {
    try {
        if (testUserId) {
            await pool.execute(
                "DELETE FROM users WHERE id = ? AND email = ?",
                [testUserId, testUser.email]
            );
        }
    } finally {
        await pool.end();
    }
});
