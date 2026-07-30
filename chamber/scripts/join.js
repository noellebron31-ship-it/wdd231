
document.addEventListener("DOMContentLoaded", () => {
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }
});


const openButtons = document.querySelectorAll(".modal-trigger");
const closeButtons = document.querySelectorAll(".modal-close");

openButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const modalId = btn.getAttribute("data-modal");
        const targetModal = document.getElementById(modalId);
        if (targetModal) {
            targetModal.showModal();
        }
    });
});

closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const dialog = btn.closest("dialog");
        if (dialog) {
            dialog.close();
        }
    });
});


document.querySelectorAll(".benefits-modal").forEach(dialog => {
    dialog.addEventListener("click", (e) => {
        const rect = dialog.getBoundingClientRect();
        if (
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom
        ) {
            dialog.close();
        }
    });
});