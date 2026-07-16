// URL of the JSON resource
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

// Select the HTML container element
const cards = document.querySelector('#cards');

// Async function to fetch prophet data
async function getProphetData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Call displayProphets passing the prophets array
        displayProphets(data.prophets);
    } catch (error) {
        console.error("Failed to fetch prophet data:", error);
    }
}

// Function to build and display prophet cards
const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        // Create card wrapper section
        let card = document.createElement('section');
        card.classList.add('prophet-card');

        // Create heading for full name
        let fullName = document.createElement('h2');
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        // Create paragraphs for additional info (birth date & place)
        let birthDate = document.createElement('p');
        birthDate.innerHTML = `<strong>Date of Birth:</strong> ${prophet.birthdate}`;

        let birthPlace = document.createElement('p');
        birthPlace.innerHTML = `<strong>Place of Birth:</strong> ${prophet.birthplace}`;

        // Create portrait image
        let portrait = document.createElement('img');
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} - ${prophet.order}th President of the Church`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // Append elements to the section card
        card.appendChild(fullName);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(portrait);

        // Append the card to the container div
        cards.appendChild(card);
    });
}

// Invoke the data retrieval
getProphetData();