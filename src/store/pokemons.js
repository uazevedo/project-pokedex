import Vue from "vue";

export default {
  state: {
    activeListUrl:'',
    pokemon: {},
    pokemonList: [],
  },
  mutations: {
    setActiveListUrl(state,activeListUrl){
      state.activeListUrl = activeListUrl;
    },
    setPokemon(state, pokemon) {
      state.pokemon = pokemon;
    },
    setPokemonList(state, pokemonList) {
      state.pokemonList = pokemonList;
    },
    setPokemonLocations(state, newLocations) {
      // Vue.set(state.pokemon,'locations',newLocations)
      state.pokemon = { ...state.pokemon, locations: newLocations };
    },
    setSpecies(state, specData) {
      state.pokemon = { ...state.pokemon, specieData: specData };
    },
    setEvolutionChain(state, evoData) {
      state.pokemon = { ...state.pokemon, evolution_chain: evoData };
    },
  },
  actions: {
    initPokemon({ dispatch }, id) {
      dispatch("setPokemon", id).then(() => {
        dispatch("setPokemonLocations").then(() =>
          dispatch("setSpecies").then(() => dispatch("setEvolutionChain"))
        );
      });
    },
    async setPokemon({ commit }, id) {
      await Vue.prototype.$api
        .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => {
          commit("setPokemon", response.data);
        });
    },
    async setPokemonLocations({ commit, state }) {
      await Vue.prototype.$api
        .get(`${state.pokemon.location_area_encounters}`)
        .then((location) => {
          if (location.data.length > 0)
            commit("setPokemonLocations", location.data);
        });
    },
    async setSpecies({ commit, state }) {
      await Vue.prototype.$api
        .get(`${state.pokemon.species.url}`)
        .then((specie) => {
          const data = (({ evolution_chain, flavor_text_entries, genera }) => ({
            evolution_chain,
            flavor_text_entries,
            genera,
          }))(specie.data);
          commit("setSpecies", data);
        });
    },
    async setEvolutionChain({ commit, state }) {
      await Vue.prototype.$api
        .get(`${state.pokemon.specieData.evolution_chain.url}`)
        .then((evolutions) => {
          commit("setEvolutionChain", evolutions.data);
        });
    },
    async setPokemonList({ commit }, param) {
      await Vue.prototype.$api
        .get(`${param}`)
        .then((response) => {
          commit("setPokemonList", response.data);
        });
    },
    setActiveListUrl({commit},activeListUrl){
      commit("setActiveListUrl",activeListUrl)
    }
  },
  getters: {
    pokemon(state) {
      return state.pokemon;
    },
    pokemonList(state) {
      return state.pokemonList;
    },
    activeListUrl(state){
      return state.activeListUrl;
    }
  },
};
