const jobsContainer = document.getElementById("jobs-container");

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

jobs.forEach(function(job) {
    const jobCard = document.createElement("div");

jobCard.classList.add("card", "p-3", "mb-3", "mx-auto");
 
const jobTitle = document.createElement("h5");
    jobTitle.textContent = job.title;

    jobCard.appendChild(jobTitle);

    const jobCountry = document.createElement("p");
    jobCountry.textContent = job.country;

    jobCard.appendChild(jobCountry);

    jobsContainer.appendChild(jobCard);
});



const jobSearch = document.getElementById("job-search");



const countrySearch = document.getElementById("country-search");


const jobSearchForm = document.getElementById("job-search-form");

const searchError = document.getElementById("search-error");
const searchSuccess = document.getElementById("search-success");

jobSearchForm.addEventListener("submit", function(event) {
    event.preventDefault();

    searchError.textContent = "";
    searchSuccess.textContent = "";


    const jobTitle = jobSearch.value.trim();

    const country = countrySearch.value.trim();

    if (jobTitle === "" || country === "") {
        searchError.textContent = "Please enter job title and country";
    } else {

        jobsContainer.textContent = "";

        const matchingJobs = jobs.filter(function(job) {
        return job.title === jobTitle && job.country === country;     
       });

        

if (matchingJobs.length === 0) {
searchError.textContent = "No jobs found for this search.";
}

 matchingJobs.forEach(function(job) {
    const jobCard = document.createElement("div");

    jobCard.classList.add("card", "p-3", "mb-3", "mx-auto");

    const jobTitleElement = document.createElement("h5");
    jobTitleElement.textContent = job.title;

    jobCard.appendChild(jobTitleElement);

    const jobCountry = document.createElement("p");
    jobCountry.textContent = job.country;

    jobCard.appendChild(jobCountry);

    jobsContainer.appendChild(jobCard);
});
    }
});