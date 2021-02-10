"use strict";

let series = [];
let favourites = [];

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
const seriesElement = document.querySelector(".js-series");
function paintShows() {
  let htmlCode = "";
  htmlCode += "<ul>";
  for (const serie of series) {
    htmlCode += `<li class='js-serie' id='${serie.show.id}'>`;
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
  listenSeriesEvents();
}
const favouriteElement = document.querySelector(".js-favourites");

function paintFavourites() {
  let htmlCode = "";
  htmlCode += "<ul>";
  for (const favourite of favourites) {
    htmlCode += `<li class='js-favourites' id='${favourite.show.id}'>`;
    htmlCode += `<p>Nombre: ${favourite.show.name}</p>`;
    if (favourite.show.image !== null) {
      htmlCode += `<img src="${favourite.show.image.medium}"/>`;
    } else {
      htmlCode += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV."/>`;
    }
    htmlCode += "</li>";
  }
  htmlCode += "</ul>";
  favouriteElement.innerHTML = htmlCode;
  setInLocalStorage();
}

button.addEventListener("click", getDataFromApi);

function listenSeriesEvents() {
  const seriesElements = document.querySelectorAll(".js-serie");
  for (const seriesElement of seriesElements) {
    seriesElement.addEventListener("click", handleSerie);
  }
}

function handleSerie(ev) {
  const clickedSerieId = parseInt(ev.currentTarget.id);
  const serieFound = series.find((serie) => {
    return serie.show.id === clickedSerieId;
  });
  favourites.push(serieFound);

  paintFavourites();
}

function setInLocalStorage() {
  const stringFavourites = JSON.stringify(favourites);
  localStorage.setItem("favourites", stringFavourites);
}

function getFromLocalStorage() {
  const localStorageFavourite = localStorage.getItem("favourites");
  if (localStorageFavourite !== null) {
    favourites = JSON.parse(localStorageFavourite);
    paintFavourites();
  }
}

getFromLocalStorage();
