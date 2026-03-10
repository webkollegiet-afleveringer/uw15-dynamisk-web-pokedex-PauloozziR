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
        .then((data) => {
            console.log(data);
            
            displayPokemonDetails(data)
            /* fetchSpecies(data) */
    })
}

/* async function fetchSpecies() {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        .then(response => response.json())
        const {flavor_text_entries} = data.species
} */

function displayPokemonDetails(data) {
        const {types=[], weight, height, abilities=[], stats=[]} = data
        const dexNumber = getPokemonId(url)
        const capitalizedName =
            name.charAt(0).toUpperCase()
            + name.slice(1)
        const pokemonDetailCard = /*html*/ `
        <article id="detail-card">
            <h2>${capitalizedName}</h2>
            <p>#${dexNumber.padStart(3, "0")}</p>
            <figure>
                <img src="${artworkUrl}${dexNumber}.png">
            </figure>
            <section>
                <p>${types[0]}</p>
                <p>${types[1]}</p>
                <h3>About</h3>
                <div>
                    <span>${weightIcon}</span>
                    <p>${weight}</p>
                    <p>Weight</p>
                </div>
                <div>
                    <span>${rulerIcon}</span>
                    <p>${height}</p>
                    <p>Height</p>
                </div>
                <div>
                    <ul>
                        <li>${abilities[0].name}</li>
                        <li>${abilities[1].name}</li>
                        <li>${abilities[2].name}</li>
                        <li>${abilities[3].name}</li>
                    </ul>
                    <p>Abilities</p>
                </div>
            </section>
            
            <h3>Base Stats</h3>
            <ul>
                <li>HP <span> | </span> ${stats[0]} <progress value="${stats[0]}" max="200"></li>
                <li>ATK <span> | </span> ${stats[1]}</li>
                <li>DEF <span> | </span> ${stats[2]}</li>
                <li>SATK <span> | </span> ${stats[3]}</li>
                <li>SDEF <span> | </span> ${stats[4]}</li>
                <li>SPD <span> | </span> ${stats[5]} <div id="progress-bar"><div id="progress-line"></div></div></li>
            </ul>
        </article> `
    mainDom.insertAdjacentHTML("beforeend", pokemonDetailCard)
}

function getPokemonId(url) {
    return url.slice(0, -1).split("/").pop()
}
{/* <p>${flavor_text}</p> */}
fetchPokemon()