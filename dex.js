const mainDom = document.querySelector("main")
let offset = 0
let limit = 20
const spriteUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"

function fetchPokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
        .then(response => response.json())
        .then((data) => {
            displayPokemon(data)
    })
}

function displayPokemon(data) {
    const results = data.results
    const pokemonString = results.map((result) => {
        const {name, url} = result
        const dexNumber = getPokemonId(url)
        return /*html*/ `
        <article>
            <p>#${dexNumber.padStart(3, "0")}</p>
            <h2>${name}</h2>
            <img src="${spriteUrl}${dexNumber}.png">
            <a href="details.html"></a>
        </article>
        `
    }).join("");
    mainDom.insertAdjacentHTML("beforeend", pokemonString)
    let observedPokemon = document.querySelector("main article:nth-last-child(5)")
    observer.observe(observedPokemon)
}

function getPokemonId(pokemonUrl) {
    return pokemonUrl.slice(0, -1).split("/").pop()
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            offset = offset + 20
            if(offset < 1350) {
                fetchPokemon(offset)
            } else {
                console.log("END")
            }
        }
    })
}, {
    threshold: 1
})

fetchPokemon(offset)

/* const articleDom = document.querySelectorAll("article")
articleDom.addEventListener("click", goToDetails)

articleDom.forEach((article) => {
    article.setAttribute("href", `detaljer.html?id=${id}`)
    article.addEventListener
}) */

/* pokemon artwork fetch from??
"sprites": {
    "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
    "back_female": null,
    "back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
    "back_shiny_female": null,
    "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    "front_female": null,
    "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
    "front_shiny_female": null,
    "other": {
        "dream_world": {
            "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
            "front_female": null
} */