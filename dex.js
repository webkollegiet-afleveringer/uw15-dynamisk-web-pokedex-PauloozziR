import { pokeballSmall, searchIcon, xIcon, letter, tag } from "./icons.js"

const pageSearch = window.location.search;
console.log(pageSearch);
const params = new URLSearchParams(pageSearch);
console.log(params);
let id = params.get("id")
console.log(id);
const baseUrl = `https://pokeapi.co/api/v2/pokemon/`
console.log(baseUrl);

const bodyWrapperDom = document.querySelector("#body-wrapper")
const mainDom = document.querySelector("main")
let offset = 0
let limit = 20
const artworkUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"
let pokemons = []

/* const searchBar = document.querySelector("#search-bar")
const searchX = document.querySelector("#search-x")
searchBar.addEventListener("input", showX)
searchX.addEventListener("click", clearInput)
function showX() {
    if(searchX.classList.contains("invisible")) {
        searchX.classList.remove("invisible")
        searchX.classList.add("visible")
    }
}
function clearInput() {
    if(searchBar !== "") {
        searchX.classList.remove("visible")
        searchX.classList.add("invisible")
        searchBar.value = ""
        fetchPokemon()
        return
    }
} */

async function init() {
    const numberOfPokemon = 1350
    const res = await fetch(`${baseUrl}?limit=${numberOfPokemon}`)
    const data = await res.json()
    pokemons = data.results
    displayHeader()
    const searchBar = document.querySelector("#search-bar")
    searchPokemon(searchBar)
}

function searchPokemon(searchBar) {
    searchBar.addEventListener("input", (event) => {
        if(searchBar.value === "") {
            fetchPokemon()
        }
        const inputValue = event.target.value.toLowerCase()
        runSearch(inputValue)
    })
}

function runSearch(inputValue) {
    const value = inputValue.trim()
    if(!value) {
        mainDom.innerHTML = ""
        return
    }
    let pokemonSearchArray
    pokemonSearchArray = searchByName(pokemons, value)
    displaySearch(pokemonSearchArray)
}

function displaySearch(data) {
    mainDom.innerHTML = ""
    const pokemons = data
    .map((pokemon) => {
        const pokemonIndex = getPokemonId(pokemon.url)
        const basePath = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/"
        const imgPath = `${basePath}${pokemonIndex}.png`
        const searchTemplate = /* html */ `
        <figure class="pokemon">
        <span class=pokemon-number">${formatDexNumber(pokemonIndex)}</span>
        <img src="${imgPath}" alt="${pokemon.name}>"
        <a href="details.html?id=${pokemonIndex}?url=${pokemon.url}&name=${pokemon.name}" class="pokemon-link"></a>
        </figure>`
        return searchTemplate
    }).join("")
    mainDom.insertAdjacentHTML("beforeend", pokemons)
}

function fetchPokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
        .then(response => response.json())
        .then((data) => {
            displayPokemon(data)
    })
}

function displayHeader() {
    const headerDom = document.querySelector("#body-header")
    if(headerDom) {
        headerDom.remove()
    }
    const header = /* html */ `
    <header id="body-header">
    <section>
        <h1>Pokédex</h1>
        <span class="pokeball">${pokeballSmall}</span>
    </section>
    <nav>
        <span id="search-glass">${searchIcon}</span>
        <input id="search-bar" type="search" placeholder="Search">
        <span id="search-x" class="invisible">${xIcon}</span>
        <button>
            <span id="sort">${letter}</svg>
        </button>
    </nav> 
    </header>`
    bodyWrapperDom.insertAdjacentHTML("afterbegin", header)
}

function displayPokemon(data) {
    const results = data.results
    const pokemonString = results.map((result) => {
        const {name, url} = result
        const dexNumber = getPokemonId(url)
        const capitalizedName =
            name.charAt(0).toUpperCase()
            + name.slice(1)
        return /*html*/ `
        <article class="pokemon-card">
            <p>#${dexNumber.padStart(3, "0")}</p>
            <h2>${capitalizedName}</h2>
            <img src="${artworkUrl}${dexNumber}.png" alt="${capitalizedName}">
            <a href="details.html?id=${dexNumber}?url=${url}&name=${name}"></a>
        </article>`
    }).join("")
    mainDom.insertAdjacentHTML("beforeend", pokemonString)
    let observedPokemon = document.querySelector("main article:nth-last-child(5)")
    observer.observe(observedPokemon)
}

function getPokemonId(pokemonUrl) {
    return pokemonUrl.slice(0, -1).split("/").pop()
}

function formatDexNumber(id) {
    return "#" + String(id.padStart(3, "0"))
}

function searchByName(pokemonArray, letter) {
    return pokemonArray.filter((pokemon) =>
        pokemon.name.includes(letter.toLowerCase())
    )
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            offset = offset + 20
            if(offset < 1350) {
                fetchPokemon(offset)
            } else {
                console.log("END OF DEX")
            }
        }
    })
}, {
    threshold: 1
})

init()
fetchPokemon(offset)