//Barre de recherche
const input = document.querySelector('input[name="pokemon"]');
const dataList = document.querySelector('#pokemon-list');

input.addEventListener('input', () => {
  const searchTerm = input.value;
  if (searchTerm.length > 0) {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=151&offset=0&species=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        dataList.innerHTML = '';
        data.results.forEach(pokemon => {
          const option = document.createElement('option');
          option.value = pokemon.name;
          dataList.appendChild(option);
        });
      });
  } else {
    dataList.innerHTML = '';
  }
});

const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');

//Les types de Pokemon sont les clés de l'objet, 
// les valeurs sont les couleurs associées à chaque type.
//  Cette constante est utilisée pour définir la couleur de fond de la carte Pokemon en fonction du type de Pokemon.
const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#EB8328',
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
// value.toLowerCase() est utilisé pour transformer la chaîne de caractères stockée dans la variable value en minuscules avant de l'utiliser pour 
// générer l'URL de l'API. Cela permet d'assurer que l'URL est en minuscules,
//  ce qui est important car les noms des pokémons dans l'API sont tous en minuscules.

const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    .then(data => data.json())
    .then(response => renderPokemonData(response))
}

  
// La réponse de l'API est convertie en JSON avec la méthode json(), 
// puis la fonction renderPokemonData() est appelée avec les données du Pokemon récupérées.


// Cette fonction prend les données d'un Pokemon récupérées par l'API PokeAPI et les utilise pour remplir les différents éléments de la carte Pokemon. 
// Les données comprennent le nom, l'image, le numéro, les statistiques et les types du Pokemon.


const renderPokemonData = data => {
    const sprite = data.sprites.front_default;
    const { stats,types} = data;
    // console.log(data)
    
    pokeName.textContent = data.name;
    pokeImg.setAttribute('src',sprite);
    pokeId.textContent = `N° ${data.id}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}

// La fonction setCardColor prend en paramètre un tableau "types" contenant des objets représentant les types de Pokémon. 
// Il récupère ensuite la couleur du premier type en utilisant "typeColors" qui est un objet avec des couleurs prédéfinies pour chaque type de Pokémon. 
// Il récupère également la couleur du deuxième type s'il existe dans le tableau "types", 
// sinon il utilise la couleur par défaut de "typeColors".

const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default

    // cette fonction applique une grille de dégradé de couleur au fond de l'image du Pokémon en utilisant la méthode "background" 
    // et en spécifiant les couleurs récupérées précédemment.

    pokeImg.style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = ' 5px 5px';

}


// Cette fonction commence par vider le contenu HTML de l'élément "pokeTypes". Ensuite, pour chaque objet de type dans le tableau "types"
// la fonction crée un élément de texte pour le type en utilisant la méthode "createElement" de l'objet "document". 
// Elle fixe ensuite la couleur de cet élément de texte en utilisant "typeColors" et ajoute le nom du type en tant que contenu textuel de l'élément. 
// Enfin, la fonction ajoute l'élément créé à l'élément "pokeTypes".

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);

    });
}

// Cette fonction commence par vider le contenu HTML de l'élément "pokeStats". 
// Ensuite, pour chaque objet de statistique dans le tableau "stats", la fonction crée trois éléments de texte en utilisant la méthode "createElement" de l'objet "document": un élément pour le nom de la statistique, un élément pour la valeur de la statistique et un élément parent pour les deux précédents éléments. La fonction fixe ensuite le contenu textuel de chaque élément créé en utilisant les propriétés de l'objet de statistique. 
// Enfin, la fonction ajoute l'élément parent à l'élément "pokeStats".

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}


