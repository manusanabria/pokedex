import axios from 'axios';
import { useState } from 'react';
import './App.css';

function App() {
  const [namePokemon, setnamePokemon] = useState('');
  const [pokemonSelected, setPokemonSelected] = useState(false);

  const [pokemon, setPokemon] = useState({
    name: '',
    img: '',
    hp: '',
    attack: '',
    defense: '',
    type: '',
  });

  const busquedaPokemon = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`)
      .then((res) => {
        console.log(res);
        setPokemon({
          name: namePokemon.toLowerCase(),
          img: res.data.sprites.front_default,
          hp: res.data.stats[0].base_stat,
          attack: res.data.stats[1].base_stat,
          defense: res.data.stats[2].base_stat,
          type: res.data.types[0].type.name,
        });
        setPokemonSelected(true);
      });
  };

  return (
    <div className="App">
      <div className="titulo-section">
        <img className="logo" alt="logo" src={require('./img/logo.png')}></img>
        <input
          type="text"
          onChange={(event) => {
            setnamePokemon(event.target.value);
          }}
        />
        <button onClick={busquedaPokemon}>Buscar Pokémon</button>
      </div>
      <div className="info-section">
        {!pokemonSelected ? (
          <h1>Escribe el nombre de un Pokémon</h1>
        ) : (
          <>
            <div className="card">
              <h1>{pokemon.name}</h1>
              <img alt="img-pokemon" src={pokemon.img}></img>
              <h3>Type: {pokemon.type}</h3>
              <h4>Hp: {pokemon.hp}</h4>
              <h4>Attack: {pokemon.attack}</h4>
              <h4>Defense: {pokemon.defense}</h4>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
