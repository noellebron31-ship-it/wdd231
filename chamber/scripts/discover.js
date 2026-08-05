import { items } from '../data/items.mjs';

document.addEventListener("DOMContentLoaded", () => {
    handleVisitorMessage();
    renderDiscoverCards();
});

// Calculate and render visitor frequency banner using localStorage
function handleVisitorMessage() {
    const messageContainer = document.getElementById("visit-message");
    if (!messageContainer) return;

    const lastVisit = localStorage.getItem("lastVisitDate");
    const now = Date.now();
    const msInDay = 86400000;

    if (!lastVisit) {
        messageContainer.innerHTML = `<p>✨ <strong>Welcome!</strong> Let us know if you have any questions.</p>`;
    } else {
        const timeDiff = now - parseInt(lastVisit, 10);
        if (timeDiff < msInDay) {
            messageContainer.innerHTML = `<p>🚀 <strong>Back so soon!</strong> Awesome!</p>`;
        } else {
            const daysBetween = Math.floor(timeDiff / msInDay);
            const dayWord = daysBetween === 1 ? "day" : "days";
            messageContainer.innerHTML = `<p>📅 You last visited <strong>${daysBetween} ${dayWord} ago</strong>.</p>`;
        }
    }

    // Persist timestamp
    localStorage.setItem("lastVisitDate", now.toString());
}

// Dynamically render the 8 cards applying grid area assignments inline
function renderDiscoverCards() {
    const gridContainer = document.getElementById("discover-grid");
    if (!gridContainer) return;

    gridContainer.innerHTML = "";

    items.forEach((item, index) => {
        const card = document.createElement("article");
        const areaName = `area-${index + 1}`;
        
        card.className = "card";
        card.style.gridArea = areaName;

        card.innerHTML = `
            <h2>${item.title}</h2>
            <figure class="card-image-wrapper">
                <img src="${item.image}" alt="${item.title}" width="300" height="200" loading="lazy">
                <span class="badge">Must Visit</span>
            </figure>
            <address>📍 ${item.address}</address>
            <p>${item.description}</p>
            <button type="button" class="learn-btn">Learn More</button>
        `;

        gridContainer.appendChild(card);
    });
}