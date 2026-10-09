const jobsContainer = document.getElementById("jobs-container");

const jobSearch = document.getElementById("job-search");
const countrySearch = document.getElementById("country-search");
const jobSearchForm = document.getElementById("job-search-form");
const searchError = document.getElementById("search-error");

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