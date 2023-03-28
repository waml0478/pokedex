const apiURL = 'https://pokeapi.co/api/v2';

// Obtener todos los Pokémon
function getAllPokemon() {
  fetch(`${apiURL}/pokemon?limit=1000`)
    .then(response => response.json())
    .then(data => {
      // Manipular los datos de los Pokémon
      const pokemonList = data.results.map(pokemon => ({
        name: pokemon.name,
        id: pokemon.url.split('/').slice(-2, -1)[0]
      }));
      
      // Mostrar los datos en la Pokédex
      displayPokemonList(pokemonList);
    })
    .catch(error => console.error(error));
}

// Obtener un Pokémon específico por ID
function getPokemonById(id) {
  fetch(`${apiURL}/pokemon/${id}`)
    .then(response => response.json())
    .then(data => {
      // Manipular los datos del Pokémon
      const pokemonData = {
        name: data.name,
        id: data.id,
        image: data.sprites.front_default,
        types: data.types.map(type => type.type.name),
        abilities: data.abilities.map(ability => ability.ability.name),
        stats: data.stats.map(stat => ({ name: stat.stat.name, base_stat: stat.base_stat })),
        moves: data.moves.map(move => move.move.name),
      };
      
      // Mostrar los datos en la Pokédex
      displayPokemonData(pokemonData);
    })
    .catch(error => console.error(error));
}

// Mostrar la lista de Pokémon en la Pokédex
function displayPokemonList(pokemonList) {
  const pokemonListElement = document.querySelector('#pokemon-list');
  
  pokemonList.forEach(pokemon => {
    const listItem = document.createElement('li');
    listItem.innerText = `${pokemon.name} (#${pokemon.id})`;
    listItem.addEventListener('click', () => getPokemonById(pokemon.id));
    pokemonListElement.appendChild(listItem);
  });
}

function displayPokemonData(pokemonData) {
  const pokemonDataElement = document.querySelector('#pokemon-data');
  
  pokemonDataElement.innerHTML = `
    <h2>${pokemonData.name} (#${pokemonData.id})</h2>
    <img src="${pokemonData.image}" alt="${pokemonData.name}">
    <p><strong>Type:</strong> ${pokemonData.types.join(', ')}</p>
    <p><strong>Abilities:</strong> ${pokemonData.abilities.join(', ')}</p>
    <p><strong>Stats:</strong></p>
  `;
  
  const statsList = document.createElement('ul');
  for (const stat of pokemonData.stats) {
    const statItem = document.createElement('li');
    statItem.textContent = `${stat.name}: ${stat.base_stat}`;
    statsList.appendChild(statItem);
  }
  pokemonDataElement.appendChild(statsList);
  
  pokemonDataElement.innerHTML += `<p><strong>Moves:</strong> ${pokemonData.moves.join(', ')}</p>`;
}

// Inicializar la Pokédex
getAllPokemon();
