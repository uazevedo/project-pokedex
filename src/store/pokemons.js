export default {
  state: {
    pokemon: [],
    pokemonList: []
  },
  mutations: {
    setPokemon(state, pokemon) {
      state.pokemon = pokemon;
    },
    setPokemonList(state, pokemonList) {
      state.pokemonList = pokemonList;
    },
  },
  actions: {
    initPokemon({ commit }) {
      this.$api
        .get(`https://pokeapi.co/api/v2/pokemon/${this.$route.params.id}`)
        .then((response) => {
          commit('setPokemon',response.data);
        })
    },
    initPokemonList({ commit }) {
      this.$api
        .get(`https://pokeapi.co/api/v2/pokemon`)
        .then((response) => {
          commit('setPokemonList',response.data);
        })
    },
    setLocations({ commit }, pokemon) {
      this.$api
        .get(`${pokemon.location_area_encounters}`)
        .then((location) => {
          commit('setLocations',location.data);
        });
    },
    setEspecies({ commit }, pokemon) {
      this.$api.get(`${pokemon.species.url}`).then((specie) => {
        const data = (({
          evolution_chain,
          flavor_text_entries,
          genera,
        }) => ({ evolution_chain, flavor_text_entries, genera }))(specie.data);
        commit('setSpecies',data);
      });
    },
    setEvolutionChain({ commit }, pokemon) {
      this.$api
        .get(`${pokemon.species.data.evolution_chain.url}`)
        .then((evolutions) => {
          commit('setEvolutionChain',evolutions.data);
        });
    },
  },
  getters:{
      pokemon(state){
          return state.pokemon
      }
  }
};
