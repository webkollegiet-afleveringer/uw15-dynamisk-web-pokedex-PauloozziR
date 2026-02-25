const listDom = document.querySelector("#pokemon-list");

const url = new URL("https://pokeapi.co/api/v2/pokemon/");

fetch(url)
    .then(response => response.json())
    .then(data => data.results.forEach(pokemon => {
        const listItem = document.createElement("li");
        listItem.textContent = pokemon.name;
        listDom.append(listItem);
    }));