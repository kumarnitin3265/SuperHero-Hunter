
const favMain = document.getElementById('fav-main');

// Retrieve favourites from localStorage or initialize as an empty array if it doesn't exist
let favouriteList = JSON.parse(localStorage.getItem('favouriteList')) || [];

console.log("star", favouriteList);

function updateFav() {

    favMain.innerHTML = "";     // Clear the existing content
    const favElements = favouriteList.map((name) =>
        `<div class="fav-home">
            <div class="fav-hero">
                ${name}
            </div>
            <div class="remove" onclick="RemoveFromFavourite('${name}')">
                <button>
                    Remove from favourite
                </button>
            </div>
    </div>`
    );

    favElements.forEach((element) => {
        favMain.innerHTML += element;       // Append each element to the favMain
    });
}


function RemoveFromFavourite(name) {

    favouriteList = favouriteList.filter(function (item) {
        return item !== name;
    });
    console.log("star", favouriteList);
    updateFav();        // Update the UI after removing the element
}

// Initial rendering
updateFav();




