// Dynamic date updates in Footer
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Mobile Hamburger Menu Toggle
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// JSON Fetching & Rendering
const url = "data/members.json";
const container = document.getElementById("members-container");

async function getMembers() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    console.error("Could not fetch member data:", error);
  }
}

function displayMembers(members) {
  container.innerHTML = ""; // Clear existing placeholder content

  members.forEach((member) => {
    const section = document.createElement("section");
    
    // Create elements
    const logo = document.createElement("img");
    logo.setAttribute("src", member.image);
    logo.setAttribute("alt", `${member.name} Logo`);
    logo.setAttribute("loading", "lazy");

    const name = document.createElement("h3");
    name.textContent = member.name;

    const address = document.createElement("p");
    address.textContent = member.address;
    address.classList.add("address");

    const phone = document.createElement("p");
    phone.textContent = member.phone;
    phone.classList.add("phone");

    const website = document.createElement("a");
    website.setAttribute("href", member.website);
    website.setAttribute("target", "_blank");
    website.textContent = "Visit Website";

    const membership = document.createElement("p");
    membership.classList.add("membership-level");
    membership.textContent = getMembershipName(member.membershipLevel);

    // Append child elements to container section
    section.appendChild(logo);
    section.appendChild(name);
    section.appendChild(address);
    section.appendChild(phone);
    section.appendChild(website);
    section.appendChild(membership);

    container.appendChild(section);
  });
}

// Convert numbers back to Membership Names
function getMembershipName(level) {
  switch (level) {
    case 1: return "Member";
    case 2: return "Silver Member";
    case 3: return "Gold Member";
    default: return "Member";
  }
}

// Grid vs List Toggle Event Listeners
const gridBtn = document.getElementById("grid-btn");
const listBtn = document.getElementById("list-btn");

gridBtn.addEventListener("click", () => {
  container.classList.add("grid-view");
  container.classList.remove("list-view");
  gridBtn.classList.add("active");
  listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
  container.classList.add("list-view");
  container.classList.remove("grid-view");
  listBtn.classList.add("active");
  gridBtn.classList.remove("active");
});

// Initialize Fetch Call
getMembers();