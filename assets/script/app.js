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
        `;
        
        recipesContainer.appendChild(card);
    });
});