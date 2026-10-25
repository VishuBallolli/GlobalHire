
const jobsContainer = document.getElementById("jobs-container");

const jobSearch = document.getElementById("job-search");
const countrySearch = document.getElementById("country-search");
const jobSearchForm = document.getElementById("job-search-form");
const searchError = document.getElementById("search-error");

// Sample jobs
const jobs = [
    {
        title: "Software Developer",
        country: "Germany"
    },
    {
        title: "Python Developer",
        country: "Canada"
    },
    {
        title: "Backend Developer",
        country: "Japan"
    },
    {
        title: "Frontend Developer",
        country: "USA"
    }
];

// Create and display a job card
function createJobCard(job) {
    const jobCard = document.createElement("div");
    jobCard.classList.add("card", "p-3", "mb-3", "mx-auto");

    const jobTitle = document.createElement("h5");
    jobTitle.textContent = job.title;

    const jobCountry = document.createElement("p");
    jobCountry.textContent = job.country;

    jobCard.appendChild(jobTitle);
    jobCard.appendChild(jobCountry);

    return jobCard;
}

// Display a list of jobs
function displayJobs(jobList) {
    jobsContainer.replaceChildren();

    jobList.forEach(function(job) {
        const jobCard = createJobCard(job);
        jobsContainer.appendChild(jobCard);
    });
}

// Display all jobs when the page loads
displayJobs(jobs);

// Handle job search form submission
jobSearchForm.addEventListener("submit", function(event) {
    event.preventDefault();

    searchError.textContent = "";
    jobsContainer.replaceChildren();

    const jobTitle = jobSearch.value.trim().toLowerCase();
    const country = countrySearch.value.trim().toLowerCase();

    if (jobTitle === "" || country === "") {
        searchError.textContent = "Please enter job title and country";
        return;
    }

    const matchingJobs = jobs.filter(function(job) {
        return (
            job.title.toLowerCase() === jobTitle &&
            job.country.toLowerCase() === country
        );
    });

    if (matchingJobs.length === 0) {
        searchError.textContent = "No jobs found for this search.";
        return;
    }

    displayJobs(matchingJobs);
});

// Login functionality
const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");

loginForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    loginMessage.textContent = "Logging in...";
    loginMessage.className = "mt-3 text-muted";

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Login failed.");
        }

        if (!result.data || !result.data.token) {
            throw new Error("Login response did not contain a token.");
        }

        sessionStorage.setItem("globalhire_token", result.data.token);

        loginMessage.textContent = "Login successful!";
        loginMessage.className = "mt-3 text-success";
    } catch (error) {
        loginMessage.textContent = error.message;
        loginMessage.className = "mt-3 text-danger";
    }
});


const registerForm = document.getElementById("register-form");
const registerMessage = document.getElementById("register-message");

registerForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    registerMessage.textContent = "Creating your account...";
    registerMessage.className = "mt-3 text-muted";

    const name = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value;

    try {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Registration failed.");
        }

        registerMessage.textContent =
            result.message || "Registration successful! You can now log in.";
        registerMessage.className = "mt-3 text-success";

        registerForm.reset();
    } catch (error) {
        registerMessage.textContent = error.message;
        registerMessage.className = "mt-3 text-danger";
    }
});
