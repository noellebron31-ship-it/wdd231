// 1. FOOTER DATES
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

// 2. MOBILE NAVIGATION TOGGLE
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
    menu.classList.toggle("hidden");
});

// 3. OPENWEATHERMAP API INTEGRATION
const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; 
const lat = "18.4861"; // Example: Santo Domingo latitude
const lon = "-69.9312"; // Example: Santo Domingo longitude

// URLs for Current Weather & 5-day Forecast
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function fetchWeather() {
    try {
        // Fetch Current Weather
        const responseCurrent = await fetch(currentWeatherUrl);
        if (responseCurrent.ok) {
            const currentData = await responseCurrent.json();
            displayCurrentWeather(currentData);
        } else {
            document.getElementById("weather-current").innerHTML = "<p>Weather data unavailable.</p>";
        }

        // Fetch Forecast
        const responseForecast = await fetch(forecastUrl);
        if (responseForecast.ok) {
            const forecastData = await responseForecast.json();
            displayForecast(forecastData);
        } else {
            document.getElementById("weather-forecast").innerHTML = "<p>Forecast data unavailable.</p>";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function displayCurrentWeather(data) {
    const container = document.getElementById("weather-current");
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    container.innerHTML = `
        <div class="weather-info-box">
            <img src="${iconUrl}" alt="${desc}">
            <div>
                <p><strong>${temp}&deg;C</strong></p>
                <p style="text-transform: capitalize;">${desc}</p>
            </div>
        </div>
    `;
}

function displayForecast(data) {
    const container = document.getElementById("weather-forecast");
    container.innerHTML = "";

    // Filter target measurements (~12:00 PM readings) for 3 consecutive days
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    const forecastWrapper = document.createElement("div");
    forecastWrapper.className = "forecast-container";

    dailyForecasts.forEach(day => {
        const dateObj = new Date(day.dt * 1000);
        const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });
        const temp = Math.round(day.main.temp);

        const dayDiv = document.createElement("div");
        dayDiv.className = "forecast-day";
        dayDiv.innerHTML = `
            <p><strong>${dayName}</strong></p>
            <p>${temp}&deg;C</p>
        `;
        forecastWrapper.appendChild(dayDiv);
    });

    container.appendChild(forecastWrapper);
}

// 4. RANDOM GOLD / SILVER MEMBER SPOTLIGHTS
const membersUrl = "data/members.json";

async function fetchSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) throw new Error("Failed to load members JSON");
        
        const members = await response.json();
        
        // Filter only Gold or Silver members
        const eligibleMembers = members.filter(
            m => m.membershipLevel === "Gold" || m.membershipLevel === "Silver"
        );

        // Randomly shuffle using Fisher-Yates or Sort-Random
        const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
        
        // Select 2 or 3 members
        const selectedSpotlights = shuffled.slice(0, 3);

        displaySpotlights(selectedSpotlights);
    } catch (error) {
        console.error("Error fetching spotlights:", error);
    }
}

function displaySpotlights(spotlights) {
    const container = document.getElementById("spotlights-grid");
    container.innerHTML = "";

    spotlights.forEach(member => {
        const card = document.createElement("div");
        card.className = "spotlight-card";

        const badgeClass = member.membershipLevel === "Gold" ? "badge-gold" : "badge-silver";

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} Logo">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
            <span class="membership-badge ${badgeClass}">${member.membershipLevel} Member</span>
        `;

        container.appendChild(card);
    });
}

// Initial Invocations
fetchWeather();
fetchSpotlights();