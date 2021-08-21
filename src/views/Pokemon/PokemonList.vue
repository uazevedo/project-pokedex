<template>
  <v-card class="mx-auto mb-10">
    <v-card-title>Pokédex</v-card-title>
    <v-text-field
      v-model="search"
      filled
      rounded
      append-icon="mdi-send"
      prepend-inner-icon="mdi-magnify"
      placeholder="Search for Pokémon"
      @click:append="searchPokemon"
      @keyup.enter="searchPokemon"
      class="mx-5"
    ></v-text-field>

    <v-divider></v-divider>

    <v-list v-if="pokemons">
      <v-list-item
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        :to="'/pokemon/' + pokemon.id"
      >
        <v-list-item-content>
          <v-sheet
            min-height="280"
            :color="colors.backgroundTypeColors.get(pokemonType(pokemon))"
            class="skewBefore"
          >
            <image src="../../assets/patterns/6x3.svg" class="imgMask"></image>
            <v-row no-gutters>
              <v-col cols="6">
                <v-list-item three-line class="pl-12 pt-12">
                  <div>
                    <v-list-item-subtitle
                      class="pt-12 pb-0 font-weight-bold text-h6"
                    >
                      <span color="white" class="text--secondary">{{
                        pokemonId(pokemon)
                      }}</span>
                    </v-list-item-subtitle>
                    <v-list-item-title
                      class="
                        pb-0
                        text-capitalize
                        white--text
                        font-weight-black
                        text-h4
                      "
                    >
                      {{ pokemon.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <v-chip-group>
                        <v-chip
                          label
                          class="text-capitalize font-weight-bold"
                          text-color="white"
                          v-for="(type, i) in pokemon.types"
                          :key="i"
                          :color="colors.elementTypeColors.get(type.type.name)"
                        >
                          <v-avatar dark class="mr-1">
                            <v-img
                              contain
                              :style="chipSvgMas(type.type.name)"
                            ></v-img>
                          </v-avatar>
                          {{ type.type.name }}
                        </v-chip>
                      </v-chip-group>
                    </v-list-item-subtitle>
                  </div>
                </v-list-item>
              </v-col>

              <v-col cols="6">
                <v-img
                  min-height="180"
                  max-height="200"
                  :src="pokemonSprite(pokemon)"
                  :alt="pokemon.name"
                  class="ma-10 imgPokemon"
                  contain
                >
                </v-img>
              </v-col>
            </v-row>
          </v-sheet>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-row justify="space-around">
      <v-btn class="ma-8" @click="navigate(pokemonList.previous)" :disabled="!pokemonList.previous" fab :color="colors.buttonColors.get('primary')"><v-icon color="white">mdi-gamepad-round-left</v-icon></v-btn>
      <v-btn class="ma-8" @click="navigate(pokemonList.next)" :disabled="!pokemonList.next"         fab :color="colors.buttonColors.get('primary')"><v-icon color="white">mdi-gamepad-round-right</v-icon></v-btn>
    </v-row>
  </v-card>
</template>

<script>
import Config from '../../core/config'
import Colors from "../../core/colors";

export default {
  name: "pokemon-list",
  data: function () {
    return {
      search:'',
      loading: false,
      pokemons: [],
      errors: []
    };
  },
  computed: {
    baseUrl(){
      return this.Config.baseApiUrl;
    },
    colors() {
      return Colors;
    },
    pokemonList() {
      return this.$store.getters.pokemonList;
    },
  },
  methods: {
    searchPokemon(){
      let self = this;
      this.$router.push({path:`/pokemon/${self.search.toLowerCase()}`})
    },
    setActiveListUrl(url){
      this.$store.dispatch('setActiveListUrl',url)
    },
    async navigate(url){
      this.setActiveListUrl(url)
      await this.$store.dispatch("setPokemonList",url).then(() => {
        this.fetchListData();
      });
    },
    pokemonType(pokemon) {
      return pokemon.types[0].type.name;
    },
    pokemonId(pokemon) {
      return `#${pokemon.id.toString().padStart(3, "0")}`;
    },
    chipSvgMas(typeName) {
      return {
        backgroundColor: "white",
        webkitMask: `url(${require(`@/assets/types/${typeName}.svg`)}) no-repeat center`,
        mask: `url(${require(`@/assets/types/${typeName}.svg`)}) no-repeat center`,
      };
    },
    pokemonSprite(pokemon) {
      let pokemonSprite;
      if (pokemon.sprites.other.official_artwork)
        pokemonSprite = pokemon.sprites.other.official_artwork.front_default;
      else if (pokemon.sprites.other.dream_world)
        pokemonSprite = pokemon.sprites.other.dream_world.front_default;
      else pokemonSprite = pokemon.sprites.front_default;

      return pokemonSprite;
    },
    fetchListData() {
      this.pokemonList.results.forEach((element) => {
        this.fetchPokemonData(element.url);
      });
    },
    fetchPokemonData(pokemonUrl) {
      this.loading = true;
      this.pokemons.length = 0;
      this.$api
        .get(pokemonUrl)
        .then((response) => {
          this.pokemons.push(response.data);
          this.pokemons.sort(function (a, b) {
            return a.id - b.id;
          });
        })
        .catch((e) => {
          this.errors.push(e);
          this.loading = false;
        });
    },
  },
  mounted(){
  },
  async created() {
    const activeListUrl = this.$store.getters.activeListUrl;
    if(activeListUrl)
      await this.$store.dispatch("setPokemonList",activeListUrl).then(() => {
        this.fetchListData();
      });
    else
      await this.$store.dispatch("setPokemonList",Config.baseApiUrl).then(() => {
        this.fetchListData();
      });
  },
};
</script>

<style>
.skewBefore{
  position:relative;
  background:#122936;
  border-radius:20px;
  overflow:hidden;
  white-space: nowrap;
}
.skewBefore::before{
  content:'';
  position: absolute;
  top: -80%;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.2);
  transform: skewY(345deg);
  transition: 1s;
}
.skewBefore:hover::before{
  top:-70%;
  transform:skewY(390deg);
}

.skewBefore::after{
  content:'Pokémon';
  position:absolute;
  bottom: 0;
  left:0;
  font-weight:600;
  font-size:10rem;
  color:rgba(0,0,0,0.05);
}

.skewBefore .imgPokemon{
  position:relative;
  display:flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  max-width:100%;
  max-height: 100%;
  z-index:1;
}

.skewBefore:hover .imgPokemon{
  max-width:60%;
  transition: 0.5s;
}

</style>