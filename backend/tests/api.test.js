
const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../server");
const pool = require("../db");

// Day 48: Temporary authentication test user
const testUser = {
    name: "GlobalHire Day48 Tester",
    email: "globalhire.day48.test@example.com",
    password: "Day48TestPassword123",
    role: "admin"
};

let testUserId;
let authToken;
let testJobId;

// Create a temporary user before authentication tests
before(async () => {
    const response = await request(app)
        .post("/api/auth/register")
        .send(testUser);

    assert.equal(response.status, 201);
    assert.equal(response.body.status, "success");

    testUserId = response.body.data.id;

    // Verify public registration cannot assign admin role
    const [users] = await pool.execute(
        "SELECT role FROM users WHERE id = ?",
        [testUserId]
    );

    assert.equal(users[0].role, "user");
});

// Test 1: Health API
test("GET /api/health should return success", async () => {
    const response = await request(app).get("/api/health");

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "success");
    assert.equal(response.body.message, "GlobalHire API is running");
});

// Test 2: Get all jobs
test("GET /api/jobs should return a list of jobs", async () => {
    const response = await request(app).get("/api/jobs");

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(response.body));
});
// Test 2.1: Get jobs with pagination
test("GET /api/jobs should support pagination", async () => {
    const response = await request(app).get("/api/jobs?page=1&limit=5");

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(response.body));
    assert.ok(response.body.length <= 5);
});

// Test 2.2: Reject an invalid page number
test("GET /api/jobs should reject page zero", async () => {
    const response = await request(app).get("/api/jobs?page=0&limit=5");

    assert.equal(response.status, 400);
    assert.equal(response.body.status, "error");
});

// Test 2.3: Reject a limit greater than 100
test("GET /api/jobs should reject limit greater than 100", async () => {
    const response = await request(app).get("/api/jobs?page=1&limit=101");

    assert.equal(response.status, 400);
    assert.equal(response.body.status, "error");
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

// Test: Reject a non-string title search parameter
test("GET /api/search should reject an invalid title parameter", async () => {
    const response = await request(app)
        .get("/api/search?title=JavaScript&title=Python");

    assert.equal(response.status, 400);
    assert.equal(response.body.status, "error");
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

// Test 15: Reject job creation without an authentication token
test("POST /api/jobs should reject requests without a token", async () => {
    const response = await request(app)
        .post("/api/jobs")
        .send({});

    assert.equal(response.status, 401);
    assert.equal(
        response.body.message,
        "Authentication token required"
    );
});

// Test 16: Reject job creation by a normal user
test("POST /api/jobs should reject normal users", async () => {
    const response = await request(app)
        .post("/api/jobs")
        .set("Authorization", `Bearer ${authToken}`)
        .send({});

    assert.equal(response.status, 403);
    assert.equal(
        response.body.message,
        "Admin access required"
    );
});

// Test 17: Allow admin to create a job
test("POST /api/jobs should allow admin users", async () => {
    await pool.execute(
        "UPDATE users SET role = 'admin' WHERE id = ?",
        [testUserId]
    );

    try {
        const response = await request(app)
            .post("/api/jobs")
            .set("Authorization", `Bearer ${authToken}`)
            .send({
                title: "GlobalHire Day48 RBAC Test Job",
                country: "India",
                salary: 50000
            });

        testJobId = response.body.data?.id;

        assert.equal(response.status, 201);
        assert.equal(response.body.status, "success");
        assert.equal(
            response.body.message,
            "Job created successfully"
        );

        assert.ok(testJobId);

    } finally {
        await pool.execute(
            "UPDATE users SET role = 'user' WHERE id = ?",
            [testUserId]
        );
    }
});


// Test 18: Reject job update without an authentication token
test("PUT /api/jobs/:id should reject requests without a token", async () => {
    const response = await request(app)
        .put("/api/jobs/1")
        .send({
            title: "Updated Test Job",
            country: "India",
            salary: 60000
        });

    assert.equal(response.status, 401);
    assert.equal(
        response.body.message,
        "Authentication token required"
    );
});


// Test 19: Reject job update by a normal user
test("PUT /api/jobs/:id should reject normal users", async () => {
    const response = await request(app)
        .put("/api/jobs/1")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
            title: "Unauthorized Updated Job",
            country: "India",
            salary: 60000
        });

    assert.equal(response.status, 403);
    assert.equal(
        response.body.message,
        "Admin access required"
    );
});

// Test 20: Allow admin to update a job
test("PUT /api/jobs/:id should allow admin users", async () => {
    await pool.execute(
        "UPDATE users SET role = 'admin' WHERE id = ?",
        [testUserId]
    );

    try {
        const response = await request(app)
      .put(`/api/jobs/${testJobId}`)
      .set("Authorization", `Bearer ${authToken}`)
            .send({
                title: "GlobalHire Day49 Updated Job",
                country: "India",
                salary: 75000
            });

        assert.equal(response.status, 200);
        assert.equal(response.body.status, "success");
        assert.equal(
            response.body.message,
            "Job updated successfully"
        );

        assert.equal(
            response.body.data.title,
            "GlobalHire Day49 Updated Job"
        );

    } finally {
        await pool.execute(
            "UPDATE users SET role = 'user' WHERE id = ?",
            [testUserId]
        );
    }
});

// Test 21: Reject job deletion without an authentication token
test("DELETE /api/jobs/:id should reject requests without a token", async () => {
    const response = await request(app)
        .delete("/api/jobs/1");

    assert.equal(response.status, 401);
    assert.equal(
        response.body.message,
        "Authentication token required"
    );
});

// Test 22: Reject job deletion by a normal user
test("DELETE /api/jobs/:id should reject normal users", async () => {
    const response = await request(app)
        .delete(`/api/jobs/${testJobId}`)
        .set("Authorization", `Bearer ${authToken}`);

    assert.equal(response.status, 403);
    assert.equal(
        response.body.message,
        "Admin access required"
    );
});


// Test 23: Allow admin to delete a job
test("DELETE /api/jobs/:id should allow admin users", async () => {
    await pool.execute(
        "UPDATE users SET role = 'admin' WHERE id = ?",
        [testUserId]
    );

    try {
        const response = await request(app)
            .delete(`/api/jobs/${testJobId}`)
            .set("Authorization", `Bearer ${authToken}`);

        assert.equal(response.status, 200);
        assert.equal(response.body.status, "success");
        assert.equal(
            response.body.message,
            "Job deleted successfully"
        );

        const [jobs] = await pool.execute(
            "SELECT id FROM jobs WHERE id = ?",
            [testJobId]
        );

        assert.equal(jobs.length, 0);

        // Prevent cleanup from attempting to delete it again.
        testJobId = null;

    } finally {
        await pool.execute(
            "UPDATE users SET role = 'user' WHERE id = ?",
            [testUserId]
        );
    }
});

// Clean up temporary test data and close database pool
after(async () => {
    try {
        if (testJobId) {
            await pool.execute(
                "DELETE FROM jobs WHERE id = ?",
                [testJobId]
            );
        }

        if (testUserId) {
            await pool.execute(
                "UPDATE users SET role = 'user' WHERE id = ?",
                [testUserId]
            );

            await pool.execute(
                "DELETE FROM users WHERE id = ? AND email = ?",
                [testUserId, testUser.email]
            );
        }
    } finally {
        await pool.end();
    }
});
