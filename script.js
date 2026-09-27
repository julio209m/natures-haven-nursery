// Data Objects / Arrays (Advanced Rubric: 2+ objects/arrays)
const plantCatalog = [
  { id: 1, name: "Snake Plant", lightRequirement: "Low Light", petSafe: false, waterFreq: "2 weeks" },
  { id: 2, name: "Boston Fern", lightRequirement: "Indirect Sunlight", petSafe: true, waterFreq: "1 week" },
  { id: 3, name: "Succulent Trio", lightRequirement: "Full Sun", petSafe: true, waterFreq: "3 weeks" }
];

let userPreferences = {
  selectedLight: "All",
  isPetFriendly: false,
  savedFavorites: []
};

document.addEventListener("DOMContentLoaded", () => {
  syncLocalStorage();
  setupValidation();
});

// Interactive Feature: Filter Function
function filterPlants() {
  const lightSelect = document.getElementById("light-select")?.value;
  const petCheckbox = document.getElementById("pet-checkbox")?.checked;
  const resultsContainer = document.getElementById("plant-results");

  if (!resultsContainer) return;

  const filtered = plantCatalog.filter(plant => {
    const matchesLight = (lightSelect === "All" || plant.lightRequirement === lightSelect);
    const matchesPet = (!petCheckbox || plant.petSafe === true);
    return matchesLight && matchesPet;
  });

  resultsContainer.innerHTML = filtered.map(plant => `
    <div class="plant-card">
      <h3>${plant.name}</h3>
      <p>Light: ${plant.lightRequirement}</p>
      <p>Pet Safe: ${plant.petSafe ? "Yes" : "No"}</p>
      <p>Watering: Every ${plant.waterFreq}</p>
    </div>
  `).join('');

  // Update State & LocalStorage
  userPreferences.selectedLight = lightSelect;
  userPreferences.isPetFriendly = petCheckbox;
  localStorage.setItem("userPreferences", JSON.stringify(userPreferences));
}

// Data Storage Function
function syncLocalStorage() {
  const stored = localStorage.getItem("userPreferences");
  if (stored) {
    userPreferences = JSON.parse(stored);
    const lightSelect = document.getElementById("light-select");
    const petCheckbox = document.getElementById("pet-checkbox");
    if (lightSelect) lightSelect.value = userPreferences.selectedLight;
    if (petCheckbox) petCheckbox.checked = userPreferences.isPetFriendly;
  }
}

// Form Validation Function
function setupValidation() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    let isValid = true;
    const emailInput = document.getElementById("email");
    const qtyInput = document.getElementById("quantity");
    
    // Clear previous errors
    document.querySelectorAll(".error-msg").forEach(el => el.remove());

    // Validation Check 1: Email Format
    if (emailInput && !emailInput.value.includes("@")) {
      isValid = false;
      showError(emailInput, "Please enter a valid email address containing '@'.");
    }

    // Validation Check 2: Quantity > 0
    if (qtyInput && (parseInt(qtyInput.value) <= 0 || !qtyInput.value)) {
      isValid = false;
      showError(qtyInput, "Please enter a plant quantity of 1 or more before submitting.");
    }

    if (!isValid) {
      e.preventDefault();
    }
  });
}

function showError(inputElem, message) {
  const err = document.createElement("span");
  err.className = "error-msg";
  err.style.color = "red";
  err.style.fontSize = "0.85rem";
  err.style.display = "block";
  err.innerText = message;
  inputElem.parentNode.insertBefore(err, inputElem.nextSibling);
}
