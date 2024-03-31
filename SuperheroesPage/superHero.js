
let showContainer = document.getElementById('show-container');
const favouriteList = [];

var ts = new Date().getTime();
ts = ts.toString();

let privateKey = '48c68a70cac515afd03a1e0e07c6b09e6981d583';
let publicKey = '8bb399cfd4129fe4eb5f34d0d4b50000';

var hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

window.onload = async () => {

    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');


    showContainer.innerHTML = "";
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&name=${name}`;
    console.log(url);

    const response = await fetch(url);
    const jsonData = await response.json();

    jsonData.data['results'].forEach((element) => {
        showContainer.innerHTML += `<div
        class='card-container'>
            <div class='container-character-image'>
                <img src="${element.thumbnail['path'] + '.' +
            element.thumbnail['extension']
            }"/>
            </div>
            <div class="character-name">${element.name}</div>
            <div class="character-description">${element.description}</div>
        </div>`;
    });
}
