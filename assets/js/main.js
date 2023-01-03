const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById('loadMoreButton');
const limit = 9;
let offset = 0;
const maxRecords = 151;
let modal = document.getElementById("myModal");
let selecionado;


let btn = document.getElementById("close");

btn.addEventListener('click',function (){
    modal.style.display = "none";
});


function toModalContent(pokemon){
    return `    
    
    <div class="modal-header">
        <h5 class="modal-title">${pokemon.name}</h5>
    </div>
    <p>
        <ol style="list-style-type: none; padding-left: 1rem;">
            <img src="${pokemon.image}" alt="${pokemon.name}" class="img-fluid">
            <hr></hr>
            <li><span class="number">Pokedex Number: ${pokemon.number}</span></li>
            <li><span>Types:</span></li>
            <ol style="list-style-type: none">
                ${pokemon.types.map( (type) => `<li class="tipo">${type}</li>`).join('')}
            </ol>
            <li><span>Altura: ${pokemon.height}</span></li>
            <li><span>Peso: ${pokemon.weight}</span></li>
            <li><span>Experiência Base: ${pokemon.base_experience}</span></li>
            <li><span>Status:</span></li>
            <ol style="list-style-type: none">
                ${pokemon.stats.map((status) => `<li class="tipo">${status}</li>`).join('') }
            </ol>
        </ol>
    </p>
            `
}


function convertPokemonToHtml(pokemon) {
    return `<li id="${pokemon.number}" class="pokemon ${pokemon.type}">
                
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




function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {

        pokemonList.innerHTML += pokemons.map(convertPokemonToHtml).join('')

    })
}


loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecord = offset + limit;
    if (qtdRecord >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }

})


window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

function openModal(target){
    modal.style.display = "block";

        pokeApi.getPokemons(target.id - 1, 1).then((pokemons = []) => {

            let p = pokemons.findIndex(pokemon => pokemon.number == target.id);
            p = pokemons[p];
            let saida = document.getElementById("pkdetail")
            saida.innerHTML = toModalContent(p)

        })
}


pokemonList.addEventListener('click', function (e) {
    let target = e.target; // Clicked element
    //console.log(target.parentElement.parentElement.parentElement);
    if (target.tagName === "LI") {
        console.log(target);
        openModal(target);
    }
    if (target.parentElement.tagName === "LI"){
        target = target.parentElement;
        openModal(target);
    }
    if (target.parentElement.parentElement.tagName === "LI"){
        target = target.parentElement.parentElement;
        openModal(target);
    }
    if (target.parentElement.parentElement.parentElement.tagName === "LI"){
        target = target.parentElement.parentElement.parentElement;      
        openModal(target);
    }
    
})


 
