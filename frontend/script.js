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

jobSearchForm.addEventListener("submit", function(event) {
    event.preventDefault();

    console.log("Search form submitted!");

    const jobTitle = jobSearch.value;
    console.log(jobTitle);

        const country = countrySearch.value;
           console.log(country);


           console.log("Searching for " + jobTitle + " jobs in " + country);
});