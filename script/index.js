// 1. DYNAMIC FOOTER ELEMENTS // 

// Set the current year dynamically
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Set the last modified date and time dynamically
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;


// 2. RESPONSIVE NAVIGATION MENU // 
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
    // Toggles the visibility of the menu by removing/adding the 'hidden' class
    menu.classList.toggle("hidden");
});


// 3. COURSE DATA SOURCE & DYNAMIC RENDERING // 

// Complete data structure array representing the certificate courses
const courses = [
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to tools used to design and produce websites.',
        completed: true // Marked as completed
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'Students will learn how to create dynamic websites using JavaScript, working with APIs, and manipulating the DOM.',
        completed: true // Marked as completed
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'An introduction to programming in Python with an emphasis on solving structural algorithmic problems using functions.',
        completed: false // Not completed yet
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Web Frontend Development I',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'Focuses on user-centric design, advanced layout architectures, and integrating structured real-world external data structures.',
        completed: false // Not completed yet
    }
];

// Target container elements inside the HTML DOM
const coursesContainer = document.querySelector("#web-certificate-courses ul");
const certificateSection = document.getElementById("web-certificate-courses");

// Create and insert a placeholder paragraph to cleanly display dynamic credits beneath the list
const creditsDisplay = document.createElement("p");
creditsDisplay.className = "credits-summary";
certificateSection.appendChild(creditsDisplay);

/**
 * Renders the filtered array of courses into the HTML structure
 * @param {Array} filteredCourses - Subset of the master courses array
 */
function displayCourses(filteredCourses) {
    // Clear the current container list to avoid data compounding
    coursesContainer.innerHTML = "";

    filteredCourses.forEach(course => {
        const li = document.createElement("li");
        li.textContent = `${course.subject} ${course.number}`;
        
        // Add specific class names to apply distinct design system color styles
        if (course.completed) {
            li.classList.add("completed");
            li.setAttribute("aria-label", `${course.subject} ${course.number} - Completed`);
        } else {
            li.classList.add("incomplete");
            li.setAttribute("aria-label", `${course.subject} ${course.number} - Incomplete`);
        }
        
        coursesContainer.appendChild(li);
    });

    // Dynamically calculate and display total running credits using array.reduce()
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    creditsDisplay.textContent = `The total credits for courses listed above is ${totalCredits}`;
}


// 4. BUTTON INTERACTION & ARRAYS FILTERING //

// Locate the tracking filter labels within the list container layout
const filterList = document.querySelector("#web-certificate-courses ul");

// Convert the static text filter list items into actual clickable interactive buttons
filterList.innerHTML = `
    <div class="filter-buttons">
        <button id="btn-all">All</button>
        <button id="btn-cse">CSE</button>
        <button id="btn-wdd">WDD</button>
    </div>
    <div class="courses-display-grid"></div>
`;

// Re-assign correct target rendering nodes updated into the DOM layout above
const dynamicGrid = document.querySelector(".courses-display-grid");
const coursesContainerRef = dynamicGrid; 

// Override displayCourses destination point targeting the clean layout injection grid
function renderGrid(filteredCourses) {
    dynamicGrid.innerHTML = "";
    filteredCourses.forEach(course => {
        const div = document.createElement("div");
        div.className = `course-card ${course.completed ? 'completed' : 'incomplete'}`;
        div.textContent = `${course.subject} ${course.number}`;
        dynamicGrid.appendChild(div);
    });
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    creditsDisplay.textContent = `The total credits for courses listed above is ${totalCredits}`;
}

// Attach operational click event listeners to track classification scopes
document.getElementById("btn-all").addEventListener("click", () => renderGrid(courses));
document.getElementById("btn-cse").addEventListener("click", () => {
    const cseCourses = courses.filter(course => course.subject === "CSE");
    renderGrid(cseCourses);
});
document.getElementById("btn-wdd").addEventListener("click", () => {
    const wddCourses = courses.filter(course => course.subject === "WDD");
    renderGrid(wddCourses);
});

// Initial cascade load invocation to render all values on basic page instantiation
renderGrid(courses);