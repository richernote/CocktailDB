//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

document.querySelector("form").addEventListener('submit', startDrink)



function startDrink(event) {

    event.preventDefault();
    
    let drinkName = document.querySelector('input').value;

    drinkName = drinkName.replace(' ', '_');

    if (!drinkName) {
        alert('Nothing entered')
        return
    }
    console.log('Starting')
    getDrink(drinkName)

}

function getDrink(drinkName) {
    console.log(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName.toLowerCase()}`)
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName.toLowerCase()}`)
        .then(rez => rez.json())
        .then(data => {
            setDrink(data.drinks[0])
            let rotation = swapDrinks(data.drinks);
            document.querySelector("button").addEventListener('click', () =>{
                if(!rotation) {
                    rotation;
                } else {
                    clearInterval(rotation);
                    rotation;
                }
            })
        })
        .catch(err => alert("Are you sure thats a drink?"))

}

function swapDrinks(drinks) {

    let i = 1;

    return interval = setInterval(() => {
        
        
        if(drinks.length === 1) {
            return;
        }
        
        i < drinks.length -1 ? i++ : i = 0;
        
        let drink = drinks[i]
        
        setDrink(drink);
    }, 4000)
}

function setDrink(drink) {
    console.log(drink)
    document.querySelector('img').src = drink.strDrinkThumb;
    document.querySelector("h2").innerText = drink.strDrink;
    document.querySelector('h3').innerText = drink.strInstructions
}