"use strict";

let series = [];
let favourite = [];

//al arrancar
const inputElement = document.querySelector(".js-user");
const button = document.querySelector(".js-search");

function getDataFromApi() {
  const inputValue = inputElement.value;
  fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      series = data;
      paintShows();
    });
}

//pintar//

const seriesElement = document.querySelector(".js-series");
function paintShows() {
  let htmlCode = "";
  htmlCode += "<ul>";
  for (const serie of series) {
    console.log(serie.show.image);
    htmlCode += `<li class='js-serie' id='${serie.show.id}'>`;
    htmlCode += `<div class="palette__color" style="background-color: #${paletteColor}"></div>`;
    htmlCode += `<p>Nombre: ${serie.show.name}</p>`;
    if (serie.show.image !== null) {
      htmlCode += `<img src="${serie.show.image.medium}"/>`;
    } else {
      htmlCode += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV."/>`;
    }
    htmlCode += "</li>";
  }
  htmlCode += "</ul>";
  seriesElement.innerHTML = htmlCode;
  // después de pintar es cuando puedo escuchar clicks sobre lo que he pintado
  listenSeriesEvents();
}
//pintar paletas favoritas//
const favouriteElement = document.querySelector(".js-favourites");

function paintFavourites() {
  let htmlCode = "";
  htmlCode += "<ul>";
  for (const favouriteElement of favouritElemnts) {
    htmlCode += `<li class='js-favourites' id='${favouriteElement.show.id}'>`;
    htmlCode += `<p>Nombre: ${favouriteElement.show.name}</p>`;
    if (serie.show !== null) {
      htmlCode += `<img src="${favouriteElement.show.image.medium}"/>`;
    } else {
    }
  }
  setInLocalStorage();
}
htmlCode += "</ul>";
favouriteElement.innerHTML = htmlCode;
button.addEventListener("click", getDataFromApi);

function listenSeriesEvents() {
  const seriesElements = document.querySelectorAll(".js-serie");
  for (const seriesElement of seriesElements) {
    seriesElement.addEventListener("click", handleSerie);
  }
}

// función que se ejecuta cuando la usuaria hace click en una serie
function handleSerie(ev) {
  console.log(ev.currentTarget);
  favourite.push(series[0]);
  console.log(favourite);
  paintFavourites();
}

/*localstorage
function setInLocalStorage() {
  const stringFavourites = JSON.stringify(favourite);
  localStorage.setItem('favourite', stringFavourites);
}
*/
