
// _______Handle Searching Food__________
const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMeals(data))
}
// ________Handle Display searching Food_______
const displayMeals = data => {
    const meals = data.meals;
    const divField = document.getElementById('div-field');
    divField.innerHTML = '';
    for (const meal of meals) {
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <div class="card" style="width: 18rem;">
           <img onclick="mealDetails(${meal.idMeal})" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" src="${meal.strMealThumb}" class="card-img-top" alt="...">
           <div class="card-body">
             <h5 class="card-title text-3xl">${meal.strMeal}</h5>
             <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
             <a href="${meal.strYoutube}" class="btn btn-primary">Go Youtube</a>
           </div>
      </div>
        `;
        divField.appendChild(newDiv);
    }

}
// _________Handle Food Details_________
const mealDetails = id => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDitails(data.meals[0]))
}
// _______Handle Display Food Details______________
const displayDitails = data => {
    const detailsHeaderDiv =document.getElementById('meal-details-header');
    const detailsBodyDiv= document.getElementById('meal-details-body');
    detailsHeaderDiv.innerHTML = `
    <h3 class="text-3xl font-medium">${data.strMeal}</h3>
    `;
    detailsBodyDiv.innerHTML = `
    <p>Food Category : ${data.strCategory}</p>
    <img src="${data.strMealThumb}" class="card-img-top" alt="...">
    <h5 class="text-2xl font-medium">${data.strMeasure1}</h5>
    <p><span class="font-medium">Ingredient</span> : ${data.strIngredient1}, ${data.strIngredient2}, ${data.strIngredient3}, ${data.strIngredient4}, ${data.strIngredient5}.</p>
    `;
}