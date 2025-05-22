// Fetch recette.json

fetch("http://127.0.0.1:3000/assets/data/recette.json")
  .then(res => res.json())
  .then(data => {
    const recipes = data.recipes;
    const recipesContainer = document.getElementById("recipesContainer");
    recipesContainer.innerHTML = "";

    // Create a card for each recipe

    recipes.forEach(recipe => {

        const card = document.createElement("div");

        card.classList.add("recipe-card");

        // Display every recipe card

        card.innerHTML = `

        <h2>${recipe.name}</h2>

        <p><strong>Nombre de personnes :</strong> ${recipe.servings}</p>
        
        <ul>
        ${recipe.ingredients.map(ingredient => {

            // See if ingredient has a quantity or a unit, and add them accordingly

            const quantityText = ingredient.quantity ? `, ${ingredient.quantity}` : '';

            const unitText = ingredient.unit ? ` ${ingredient.unit}` : '';

            return `<li>${ingredient.ingredient}${quantityText}${unitText}</li>`;

        }).join('')}
        </ul>
        <button class="recipe-button">Recette complète</button>
        `;

         // Pop-up to fully display recipes

        const openModalButton = card.querySelector(".recipe-button");

        openModalButton.addEventListener("click", (e) => {
        e.preventDefault();

        openModal();

        const modalContent = document.getElementById("modal");

        // Display the recipes

        modalContent.innerHTML = `

            <h2>${recipe.name}</h2>

            <p><strong>Nombre de personnes :</strong> ${recipe.servings}</p>

            <p><strong>Temps de préparation :</strong> ${recipe.time} minutes</p>

            <p><strong>Ingrédients :</strong></p>

            <ul>
            ${recipe.ingredients.map(ingredient => {

                // See if ingredient has a quantity or a unit, and add them accordingly

                const quantityText = ingredient.quantity ? `, ${ingredient.quantity}` : '';

                const unitText = ingredient.unit ? ` ${ingredient.unit}` : '';

                return `<li>${ingredient.ingredient}${quantityText}${unitText}</li>`;

            }).join('')}
            </ul>

            <p><strong>Ustensiles :</strong></p>
            <ul>
                ${recipe.ustensils.map(ustensil => `<li>${ustensil}</li>`).join('')}
            </ul>

            <p><strong>Appareils/Récipients :</strong></p>
            <ul>
                <li>${recipe.appliance}</li>
            </ul>
            
            <p><strong>Instructions :</strong></p>
            <p>${recipe.description}</p>

            <button class="close-modal recipe-button">Fermer</button>
        `;
        
        // Close pop-up

        const closeModalButton = modalContent.querySelector(".close-modal");

        closeModalButton.addEventListener("click", (e) => {
          e.preventDefault();

          closeModal();
        });
    });

    // Append the card to the recipes container

    recipesContainer.appendChild(card);
});

// Functions to open and close the pop-up

function openModal() {
    document.getElementById("modal").style.display = "block";
};

function closeModal() {
    document.getElementById("modal").style.display = "none";
};

});


// Get the HTML search bar ids

const searchInput = document.getElementById("searchInput");
const recipesContainer = document.getElementById("recipesContainer");
  
// Function to search recipes

function searchRecipes() {

const searchQuery = searchInput.value.toLowerCase();
const recipes = document.querySelectorAll(".recipe-card");
  
// Searches through each recipe title and only display the ones according to the research

recipes.forEach(recipe => {
    const recipeName = recipe.querySelector("h2").textContent.toLowerCase();
  
    if (recipeName.includes(searchQuery)) {
        recipe.style.display = "block";
    } else {
    recipe.style.display = "none";
    };

});

};
  
// Add event listener to search input

searchInput.addEventListener("input", searchRecipes);