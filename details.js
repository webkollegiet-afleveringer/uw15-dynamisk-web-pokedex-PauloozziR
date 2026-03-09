import { arrowLeft, chevronLeft, chevronRight, pokeballBig } from "./icons.js"

const pageSearch = window.location.search;
console.log(pageSearch);
const params = new URLSearchParams(pageSearch);
console.log(params);
let id = params.get("id")
console.log(id)

const mainDom = document.querySelector("main")
const artworkUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"

function fetchPokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then((data) => {
            displayPokemonDetails(data)
            fetchSpecies(data)
    })
}

async function fetchSpecies() {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        .then(response => response.json())
        const {flavor_text_entries} = 
}

function displayPokemonDetails(data) {
    const results = data.results
    const pokemonString = results.map((result) => {
        const {name, url, types=[], weight, height, abilities=[], stats=[]} = result
        const dexNumber = getPokemonId(url)
        const capitalizedName =
            name.charAt(0).toUpperCase()
            + name.slice(1)
        return /*html*/ `
        <article id="detail-card">
            arrow left svg
            pokeball svg
            chevron left svg
            chevron right svg
            <h2>${capitalizedName}</h2>
            <p>"#"${dexNumber.padStart(3, "0")}</p>
            <figure>
                <img src="${artworkUrl}${dexNumber}.png">
            </figure>
            <section>
                <p>${types[0]}</p>
                <p>${types[1]}</p>
                <h3>About</h3>
                <div>
                    <svg>
                    <p>${weight}</p>
                    <p>Weight</p>
                </div>
                <div>
                    <svg>
                    <p>${height}</p>
                    <p>Height</p>
                </div>
                <div>
                    <svg>
                    <ul>
                        <li>${abilities[0]}</li>
                        <li>${abilities[1]}</li>
                        <li>${abilities[2]}</li>
                        <li>${abilities[3]}</li>
                    </ul>
                    <p>Abilities</p>
                </div>
            </section>
            <p>${flavor_text[0]}</p>
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
    }).join("")
    mainDom.insertAdjacentHTML("beforeend", pokemonString)
}

function getPokemonId(pokemonUrl) {
    return pokemonUrl.slice(0, -1).split("/").pop()
}

fetchPokemon()