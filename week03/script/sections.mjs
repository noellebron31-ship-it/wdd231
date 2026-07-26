export function setSectionSelection(sections) {
  const sectionElement = document.querySelector("#sectionNumber");
  
  // Clear any existing options first
  sectionElement.innerHTML = "";
  
  sections.forEach((section) => {
    const option = document.createElement("option");
    option.value = section.sectionNum;
    option.textContent = `Section ${section.sectionNum} - ${section.instructor}`;
    sectionElement.appendChild(option);
  });
}