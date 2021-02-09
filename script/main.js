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
    htmlCode += "<li class='js-serie'>";
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

button.addEventListener("click", getDataFromApi);

function listenSeriesEvents() {
  /*  document.querySelectorAll
  for (const iterator of object) {
    addEventListener("click",listenSeriesEvents);
  }*/
}

/*// local storage

function setInLocalStorage() {
  const stringPalettes = JSON.stringify(palettes);
  localStorage.setItem('palettes', stringPalettes);
}

function getFromLocalStorage() {
  const localStoragePalettes = localStorage.getItem('palettes');
  if (localStoragePalettes === null) {
    getDataFromApi();
  } else {
    const arrayPalettes = JSON.parse(localStoragePalettes);
    palettes = arrayPalettes;
    paintPalettes();
  }
}

function getFromLocalStorage() {
  const localStoragePalettes = localStorage.getItem('palettes');
  if (localStoragePalettes === null) {
    getDataFromApi();
  } else {
    const arrayPalettes = JSON.parse(localStoragePalettes);
    palettes = arrayPalettes;
    paintPalettes();
  }
}

  
}
*/
