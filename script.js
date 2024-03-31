let input = document.getElementById('input-box');
let showContainer = document.getElementById('show-container');
let listContainer = document.querySelector('.list');
let favList = document.querySelector('.home-fav');

var favouriteList = [];

var ts = new Date().getTime();
ts = ts.toString();

let privateKey = '48c68a70cac515afd03a1e0e07c6b09e6981d583';
let publicKey = '8bb399cfd4129fe4eb5f34d0d4b50000';

var hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

function addToFavourite(name) {
    if(favouriteList.includes(name)){
        return;
    }
    favouriteList.push(name);
    localStorage.setItem('favouriteList', JSON.stringify(favouriteList));
    console.log("favourite", favouriteList);
}

function displayWords(value) {
    input.value = value;
    removeElements();

    // Open a new tab with the selected superhero
    window.open(`./SuperheroesPage/superHero.html?name=${encodeURIComponent(value)}`, '_blank');

    // Add the superhero to the favourite list
    addToFavourite(value);

    input.value = "";
}

function displayFav() {
    window.open(`./FavouritesPage/favourite.html`);
}

favList.addEventListener('click', () => {
    displayFav();
});


function removeElements() {
    listContainer.innerHTML = "";
}

input.addEventListener('keyup', async () => {
    removeElements();
    if (input.value.length < 4) {
        return false;
    }

    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${input.value}`;

    const response = await fetch(url);
    const jsonData = await response.json();

    jsonData.data['results'].forEach((result) => {
        let name = result.name;
        let div = document.createElement('div');
        div.style.cursor = 'pointer';
        div.classList.add('autocompleteItems');

        let word = '<b>' + name.substr(0, input.value.length) + '</b>';
        word += name.substr(input.value.length);

        div.innerHTML = `
            <span class="item-span">
                <p class="item">${word}</p>
            </span> 
            <span class="star-span">
                <img class="star" onclick="addToFavourite('${name}')" src="https://cdn-icons-png.flaticon.com/128/616/616490.png"/>
            </span>
        `;

        listContainer.appendChild(div);

        // Get the item-span element within the div and attach onclick event listener
        let itemSpan = div.querySelector('.item-span');
        itemSpan.addEventListener('click', function() {
            displayWords(name);
        });
    });
});
