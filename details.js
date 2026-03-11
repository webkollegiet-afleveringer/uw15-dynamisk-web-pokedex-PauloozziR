import { arrowLeft, chevronLeft, chevronRight, pokeballBig, weightIcon, rulerIcon } from "./icons.js"

const pageSearch = window.location.search;
const params = new URLSearchParams(pageSearch);
let id = params.get("id")
console.log(id)
let url = params.get("url")
console.log(url)
let name = params.get("name")
console.log(name)

const mainDom = document.querySelector("main")
const artworkUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"

function fetchPokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then( await = (data) => {
            console.log(data);
            
            displayPokemonDetails(data)
            /* fetchSpecies(data) */
            getData()
    })
}

async function getData() {
  const [types, abilities, stats] = await Promise.all([
    fetch("/types").then(r => r.json()),
    fetch("/abilities").then(r => r.json()),
    fetch("/stats").then(r => r.json())
  ]);
 
  console.log(abilities, types, stats);
}

/* async function fetchSpecies() {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        .then(response => response.json())
        const {flavor_text_entries} = data.species
} */

function displayPokemonDetails(data) {
        const {types, weight, height, abilities, stats} = data
        const dexNumber = getPokemonId(url)
        const capitalizedName =
            name.charAt(0).toUpperCase()
            + name.slice(1)
        const pokemonDetailCard = /*html*/ `
        <article id="detail-card">
            <span id="back-arrow">${arrowLeft}</span>
            <h2>${capitalizedName}</h2>
            <p>#${dexNumber.padStart(3, "0")}</p>
            <figure>
                <span id="prev-dex">${chevronLeft}</span>
                <img src="${artworkUrl}${dexNumber}.png">
                <span id="next-dex">${chevronRight}</span>
            </figure>
            <span id="pokeball-big">${pokeballBig}</span>
            <section>
                <div id="type-box">
                    <p>${types[0]}</p>
                    <p>${types[1]}</p>
                </div>
                <h3 id="info-heading">About</h3>
                <div id="weight-box">
                    <span>${weightIcon}</span>
                    <p>${weight}</p>
                    <p>Weight</p>
                </div>
                <div id="height-box">
                    <span>${rulerIcon}</span>
                    <p>${height}</p>
                    <p>Height</p>
                </div>
                <div id="ability-box">
                    <ul>
                        <li>${abilities[0]}</li>
                        <li>${abilities[1]}</li>
                        <li>${abilities[2]}</li>
                        <li>${abilities[3]}</li>
                    </ul>
                    <p>Abilities</p>
                </div>
            </section>
            <p id="flavor-text"></p>
            <h3 id="stat-heading">Base Stats</h3>
            <ul id="stat-list">
                <li>HP <span> | </span> ${stats[0]} <progress value="${stats[0]}" max="200"></li>
                <li>ATK <span> | </span> ${stats[1]} <progress value="${stats[0]}" max="200"></li>
                <li>DEF <span> | </span> ${stats[2]} <div id="progress-bar"><div id="progress-line"></div></div></li>
                <li>SATK <span> | </span> ${stats[3]} <progress value="${stats[0]}" max="200"></li>
                <li>SDEF <span> | </span> ${stats[4]} <progress value="${stats[0]}" max="200"></li>
                <li>SPD <span> | </span> ${stats[5]} <div id="progress-bar"><div id="progress-line"></div></div></li>
            </ul>
        </article> `
    mainDom.insertAdjacentHTML("beforeend", pokemonDetailCard)
}

function getPokemonId(url) {
    return url.slice(0, -1).split("/").pop()
}
{/* ${flavor_text} */}
fetchPokemon()