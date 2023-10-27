
const dropdown = document.getElementById("dropdown");
const selectedOption = document.getElementById("selectedOption");

dropdown.addEventListener("change", function () {
    selectedOption.textContent = dropdown.value;
});
