function fetchPokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then((data) => {
            displayPokemonDetails(data)
    })
}

function displayPokemonDetails(data) {
    const results = data.results
    const pokemonString = results.map((result) => {
        const {name, url, stats, types, height, weight, abilities} = result
        const dexNumber = getPokemonId(url)
        const capitalizedName =
            name.charAt(0).toUpperCase()
            + name.slice(1)
        return /*html*/ `
        <article>
            <h2>${capitalizedName}</h2>
            <p>"#"${dexNumber.padStart(4, "0")}</p>
            <img src="${spriteUrl}${dexNumber}.png">
            <div>
                <p>${types[0]}</p>
                <p>${types[1]}</p>
            </div>
            <section>
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
            <p>Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.</p>
            <h3>Base Stats</h3>
            <ul>
                <li>HP <span> </span> ${stats[0]}</li>
                <li>ATK <span> </span> ${stats[1]}</li>
                <li>DEF <span> </span> ${stats[2]}</li>
                <li>SATK <span> </span> ${stats[3]}</li>
                <li>SDEF <span> </span> ${stats[4]}</li>
                <li>SPD <span> </span> ${stats[5]}</li>
            </ul>
        </article>
        `
    }).join("");
    mainDom.insertAdjacentHTML("beforeend", pokemonString)
}

function getPokemonId(pokemonUrl) {
    return pokemonUrl.slice(0, -1).split("/").pop()
}

fetchPokemon()
console.log(pokemonString);
