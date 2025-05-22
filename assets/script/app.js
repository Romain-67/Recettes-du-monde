fetch("http://127.0.0.1:3000/assets/data/recette.json")
  .then(res => res.json())
  .then(data => {
    const recipes = data.recipes;
    const recipesContainer = document.getElementById("recipesContainer");
    recipesContainer.innerHTML = "";

    recipes.forEach(recipe => {

      const card = document.createElement("div");

      card.classList.add("recipe-card");

      card.innerHTML = `
        <h2>${recipe.name}</h2>

        <p><strong>Nombre de personnes :</strong> ${recipe.servings}</p>
        
        <ul>
        ${recipe.ingredients.map(ingredient => {

            const quantityText = ingredient.quantity ? ` ${ingredient.quantity}` : '';

            const unitText = ingredient.unit ? ` ${ingredient.unit}` : '';

            return `<li>${ingredient.ingredient}${quantityText}${unitText}</li>`;

        }).join('')}
        </ul>
        <button class="recipe-button">Recette complète</button>
        `;

      const openModalButton = card.querySelector(".recipe-button");

      openModalButton.addEventListener("click", (e) => {
        e.preventDefault();

        openModal();

        const modalContent = document.getElementById("modal");

        modalContent.innerHTML = `

            <h2>${recipe.name}</h2>

            <p><strong>Nombre de personnes :</strong> ${recipe.servings}</p>

            <p><strong>Temps de préparation :</strong> ${recipe.time} minutes</p>

            <p><strong>Ingrédients :</strong></p>

            <ul>
            ${recipe.ingredients.map(ingredient => {
                const quantityText = ingredient.quantity ? ` ${ingredient.quantity}` : '';
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
        
        const closeModalButton = modalContent.querySelector(".close-modal");

        closeModalButton.addEventListener("click", (e) => {
          e.preventDefault();

          closeModal();
        });
      });

      recipesContainer.appendChild(card);
    });

    function openModal() {
      document.getElementById("modal").style.display = "block";
    };

    function closeModal() {
      document.getElementById("modal").style.display = "none";
    };
  });