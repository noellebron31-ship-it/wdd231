document.addEventListener("DOMContentLoaded", () => {
    const resultsContainer = document.getElementById("results");
    const currentUrl = window.location.href;
    const formData = new URLSearchParams(window.location.search);

    if (!formData.has("fname")) {
        resultsContainer.innerHTML = "<p>No form data found. Please complete the <a href='join.html'>application form</a> first.</p>";
        return;
    }

  
    function getParam(key) {
        return formData.get(key) || "N/A";
    }

    
    let rawDate = getParam("timestamp");
    let formattedDate = rawDate;
    if (rawDate !== "N/A") {
        try {
            formattedDate = new Date(rawDate).toLocaleString();
        } catch (e) {
            formattedDate = rawDate;
        }
    }

    resultsContainer.innerHTML = `
        <dl>
            <dt>First Name:</dt>
            <dd>${getParam("fname")}</dd>

            <dt>Last Name:</dt>
            <dd>${getParam("lname")}</dd>

            <dt>Email Address:</dt>
            <dd>${getParam("email")}</dd>

            <dt>Mobile Phone:</dt>
            <dd>${getParam("phone")}</dd>

            <dt>Business / Organization Name:</dt>
            <dd>${getParam("organization")}</dd>

            <dt>Application Timestamp:</dt>
            <dd>${formattedDate}</dd>
        </dl>
    `;
});