const jobsContainer = document.getElementById("jobs-container");


const jobCard = document.createElement("div");
jobCard.textContent = "Software Developer - Germany";
jobsContainer.appendChild(jobCard);

const secondJobCard = document.createElement("div");
secondJobCard.textContent = "Python Developer - Canada";
jobsContainer.appendChild(secondJobCard);

jobCard.classList.add("card");

const searchButton = document.getElementById("search-button");
console.log(searchButton);

const jobSearch = document.getElementById("job-search");

jobSearch.addEventListener("input", function() {
    console.log("User is typing");
});

const countrySearch = document.getElementById("country-search");

countrySearch.addEventListener("change", function() {
    console.log("Country changed");
});

const jobSearchForm = document.getElementById("job-search-form");
console.log(jobSearchForm);

const searchError = document.getElementById("search-error");
const searchSuccess = document.getElementById("search-success");

jobSearchForm.addEventListener("submit", function(event) {
    event.preventDefault();

    searchError.textContent = "";
    searchSuccess.textContent = "";

    console.log("Search form submitted!");

    const jobTitle = jobSearch.value.trim();
    console.log(jobTitle);

    const country = countrySearch.value.trim();
    console.log(country);

    if (jobTitle === "" || country === "") {
        console.log("Please enter job title and country");
        searchError.textContent = "Please enter job title and country";
    } else {
        console.log("Search input is valid");
        searchSuccess.textContent = "Search input is valid!";
    }
});