import { pokeballSmall, searchIcon, xIcon, letter, tag } from "./icons.js"

const pageSearch = window.location.search;
const params = new URLSearchParams(pageSearch);
let id = params.get("id")
const baseUrl = `https://pokeapi.co/api/v2/pokemon/`

const bodyWrapperDom = document.querySelector("#body-wrapper")
const mainDom = document.querySelector("main")
let offset = 0
let limit = 20
const artworkUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"
let pokemonsArray = []
let searchMethod = "name"

/* const searchDom = document.querySelector("#search-bar")
const searchX = document.querySelector("#search-x") */
/* searchDom.addEventListener("input", showX)
searchX.addEventListener("click", clearInput) */
/* function showX(searchDom) {
    if(searchX.classList.contains("invisible")) {
        searchX.classList.remove("invisible")
        searchX.classList.add("visible")
    }
}
function clearInput(searchDom) {
    if(searchDom !== "") {
        searchX.classList.remove("visible")
        searchX.classList.add("invisible")
        searchDom.value = ""
        fetchPokemon()
        return
    }
} */

async function init() {
    const numberOfPokemon = 1350
    const res = await fetch(`${baseUrl}?limit=${numberOfPokemon}`)
    const data = await res.json()
    pokemonsArray = data.results
    displayHeader()
    const searchDom = document.querySelector("#search-bar")
    const searchX = document.querySelector("#search-x")
    shiftSearchMethod(searchDom)
    searchPokemon(searchDom, searchX)
}

function shiftSearchMethod(searchDom) {
    const sortButtonDom = document.querySelector("#sort")
    sortButtonDom.addEventListener("click", () => {
        if(searchMethod === "name") {
            searchMethod = "id"
        } else {
            searchMethod = "name"
        }
        shiftSearchIcon(searchMethod, sortButtonDom)
        runSearch(searchDom.value)
    })
}

function shiftSearchIcon(searchMethod, sortButtonDom) {
    const inputDom = sortButtonDom.closest("header").querySelector("input")
    inputDom.value = ""
    if(searchMethod === "id") {
        sortButtonDom.innerHTML = ""
        sortButtonDom.innerHTML = tag
    } else {
        sortButtonDom.innerHTML = ""
        sortButtonDom.innerHTML = letter
    }
    fetchPokemon()
}

function searchPokemon(searchDom, searchX) {
    searchDom.addEventListener("input", (event) => {
        if(searchDom.value === "") {
            fetchPokemon()
        }
        const inputValue = event.target.value.toLowerCase()
        runSearch(inputValue)
        showX(searchX)
    })
}

function runSearch(inputValue) {
    const value = inputValue.trim()
    if(!value) {
        mainDom.innerHTML = ""
        return
    }
    let pokemonSearchArray
    if(searchMethod === "name") {
        pokemonSearchArray = searchByName(pokemonsArray, value)
    } else {
        pokemonSearchArray = searchById(pokemonsArray, value)
    }
    displaySearch(pokemonSearchArray)
}

function searchById(pokemonsArray, id) {
    id = Number(id)
    let searchResult = pokemonsArray.filter((pokemon, index) => {
        let pokemonUrlNumber = Number(getPokemonId(pokemon.url))
        let searchIndex
        searchIndex = index + 1
        if(pokemonUrlNumber == 10001) {
            id += 8975
        }
        return pokemonUrlNumber == id
    })
    return searchResult
}

function displaySearch(data) {
    mainDom.innerHTML = ""
    const pokemonTemplate = data
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
    mainDom.insertAdjacentHTML("beforeend", pokemonTemplate)
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
        <button id="sort">
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
            <a href="details.html?id=${dexNumber}&url=${url}&name=${name}"></a>
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

function searchByName(pokemonsArray, letter) {
    return pokemonsArray.filter((pokemon) =>
        pokemon.name.includes(letter.toLowerCase())
    )
}

function showX(searchX) {
    if(searchX.classList.contains("invisible")) {
        searchX.classList.remove("invisible")
        searchX.classList.add("visible")
    }
    searchX.addEventListener("click", clearInput)
}
function clearInput(searchDom, searchX) {
    if(searchDom.value !== "") {
        searchX.classList.remove("visible")
        searchX.classList.add("invisible")
        searchDom.value = ""
        fetchPokemon()
    }
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