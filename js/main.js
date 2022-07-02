//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

document.querySelector("form").addEventListener('submit', startDrink)
const back = document.querySelector("#back")
const forward = document.querySelector("#forward")


function startDrink(event) {

    event.preventDefault();
    
    let drinkName = document.querySelector('input').value;

    drinkName = drinkName.replace(' ', '_');

    if (!drinkName) {
        alert('Nothing entered')
        return
    }

    getDrink(drinkName)

}

function getDrink(drinkName) {

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName.toLowerCase()}`)
        .then(rez => rez.json())
        .then(data => {

            const drinks = data.drinks
            const box = document.getElementById('box')
            
            if(box.childElementCount > 0) {
                box.replaceChildren();
                drinkPopulate(drinks);
            } else {
                drinkPopulate(drinks)
            }

        })
        .catch(err => alert("Are you sure thats a drink?"))
}


function drinkPopulate(drinks) {

    return drinks.map((drink) => {

        let drinkElement = document.createElement('div');
        drinkElement.classList.add('card')
        let drinkTitle = document.createElement('h2');
        let drinkImage = document.createElement('img');
        let drinkInstructions = document.createElement('p');

        setDrink(drink, drinkTitle, drinkImage, drinkInstructions)

        drinkElement.appendChild(drinkTitle)
        drinkElement.appendChild(drinkImage)
        drinkElement.appendChild(drinkInstructions)

        document.getElementById('box').appendChild(drinkElement)
    })
}

function setDrink(drink, name, img, instructions) {
    img.src = drink.strDrinkThumb;
    name.innerText = drink.strDrink;
    instructions.innerText = drink.strInstructions
}