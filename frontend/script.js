console.log("GlobalHire JavaScript is working!");
let jobTitle = "Software Developer";

console.log(jobTitle);

let country = "Germany";
let role = "Backend Developer";

console.log(country);
console.log(role);

let savedJobs = 0;
console.log(savedJobs);

savedJobs = 3;
console.log(savedJobs);

const companyName = "GlobalHire";
console.log(companyName);

const platformName = "GlobalHire";
const mainCountry = "Germany";

console.log(platformName);
console.log(mainCountry);

let jobCount = 25;
let isLoggedIn = true;
let hasApplied = false;

console.log(typeof jobCount);
console.log(typeof isLoggedIn);
console.log(typeof country);

let userName;

console.log(userName);
console.log(typeof userName);

let userEmail = "Vishu120@gmail.com";
let userPhone = "1234567890";

console.log(typeof userEmail);
console.log(typeof userPhone);

let profilePhoto = null;

console.log(profilePhoto);
console.log(typeof profilePhoto);

const job = {
    title: "Software Developer",
    company: "Tech Solutions",
    country: "Germany",
    salary: 50000
};

console.log(job.title);
console.log(job.country);
console.log(job.company);
console.log(job.salary);

job.salary = 60000;

console.log(job.salary);

job.country = "Russia";

console.log(job.country);

const skills = ["HTML","CSS","JavaScript","Node.js","MySQL"];


console.log(skills[0]);
console.log(skills[1]);
console.log(skills[2]);
console.log(skills[3]);
console.log(skills[4]);

console.log(skills.length);

skills.push("Express.js","Docker");
console.log(skills.length);

skills.pop();
console.log(skills);
console.log(skills.length);

function greetUser() {
    console.log("Welcome to GlobalHire!");
}

greetUser();

function welcomeUser(name) {
    console.log("welcome, " + name +  "!");
}

welcomeUser("vishu");