const URL = 'https://pokeapi.co/api/v2';
const pokemonCard = document.querySelector('[data-pokemon-card]');
const pokemonName = document.querySelector('[data-pokemon-name]');
const pokemonImg = document.querySelector('[data-pokemon-img]');
const pokemonImgContainer = document.querySelector('[data-pokemon-img-container]');
const pokemonId = document.querySelector('[data-pokemon-id]');
const pokemonTypes = document.querySelector('[data-pokemon-types]');
const pokemonStats = document.querySelector('[data-pokemon-stats]');
const pokemonMoves = document.querySelector('[data-pokemon-moves]');

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};


const buscarPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`${URL}/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}

const renderPokemonData = data => {
    const sprite =  data.sprites.front_default;
    const { stats, types, moves } = data;

    pokemonName.textContent = `Nombre: ${data.name}`;
    pokemonImg.setAttribute('src', sprite);
    pokemonId.textContent = `ID: ${data.id}`;
    renderPokemonTypes(types);
    renderPokemonStats(stats);
    renderPokemonMoves(moves);
}

const setColorTarjeta = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokemonImg.style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
}

const renderPokemonTypes = types => {
    pokemonTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokemonTypes.appendChild(typeTextElement);
    });
}

const renderPokemonMoves = moves => {
    pokemonMoves.innerHTML = '';
    moves.forEach(move => {
        const moveTextElement = document.createElement("div");
        moveTextElement.textContent = move.move.name;
        pokemonMoves.appendChild(moveTextElement);
    });
}

const renderPokemonStats = stats => {
    pokemonStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokemonStats.appendChild(statElement);
    });
}

const renderNotFound = () => {
    pokemonName.textContent = 'No encontrado';
    pokemonImg.setAttribute('src', './img/poke-shadow.png');
    pokemonImg.style.background =  '#fff';
    pokemonTypes.innerHTML = '';
    pokemonStats.innerHTML = '';
    pokemonMoves.innerHTML = '';
    pokemonId.textContent = '';
}
