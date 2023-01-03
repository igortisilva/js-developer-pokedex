const pokeApi = {}


function convertPokeApiDetailToPokemon(pokeDetail){
    const p = new Pokemon();

    p.name = pokeDetail.name;
    p.number = pokeDetail.id;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;
    
    p.types = types;
    p.type = type;

    p.image = pokeDetail.sprites.other.home.front_shiny;

    const stats = pokeDetail.stats.map((stat) => capitalizeFirstLetter(stat.stat.name) +": " + stat.base_stat + "\n")
    p.stats = stats;

    p.height = pokeDetail.height;
    p.weight = pokeDetail.weight;
    p.base_experience = pokeDetail.base_experience;


    return p;
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url).then( (response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 9) => {
    
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    
    const pokemonList = document.getElementById("pokemonList");
    

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map( pokeApi.getPokemonDetail ) )
        .then((detailRequests) =>  Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((error) => console.log(error))
}