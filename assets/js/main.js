const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById('loadMoreButton');
const limit = 9;
let offset = 0;
const maxRecords = 151;

function convertPokemonToHtml(pokemon){
    return `<li class="pokemon ${pokemon.type}">
                <span class="number">${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">

                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type  ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.image}" alt="${pokemon.name}">
                </div>
                
            </li>`
}






function loadPokemonItens(offset,limit){
    pokeApi.getPokemons(offset,limit).then((pokemons = []) => {
    
        pokemonList.innerHTML += pokemons.map(convertPokemonToHtml).join('')
        
    })
}


loadPokemonItens(offset,limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecord = offset + limit;
    if(qtdRecord >= maxRecords){
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset,newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    }else{
        loadPokemonItens(offset,limit);
    }
    
})



