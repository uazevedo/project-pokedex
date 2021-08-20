<template>
  <div>
    <v-card v-if="!loading" class="mx-auto">
      <v-sheet :color="bgElementColors.get(pokemonType)">
        <v-row no-gutters >
          <v-col cols="6">
            <router-link to="/pokemon">
            <v-btn depressed icon class="float-start">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </router-link>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-subtitle
                  class="pt-12 pb-0 font-weight-bold text-h6"
                >
                  <span color="white" class="text--secondary" >{{ pokemonId }}</span>
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
                      :color="elementColors.get(type.type.name)"
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
              </v-list-item-content>
            </v-list-item>
          </v-col>

          <v-col cols="6">
            <v-img
              max-height="100%"
              :src="pokemonSprite"
              :alt="pokemon.name"
              class="ma-10"
              contain
            >
            </v-img>
          </v-col>
        </v-row>
      </v-sheet>
    </v-card>

    <v-card color="white" class="mx-auto rounded-xl mt-n5" v-if="!loading">

      <v-tabs
      fixed-tabs
      center-active
      v-model="tab">
        <v-tab v-for="(tab,i) in tabs" :key="i">{{tab.label}}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(tab,i) in tabs" :key="i">
            <component v-if="!loading" :pokemon="pokemon" :is="tab.component"></component>
        </v-tab-item>
      </v-tabs-items>
      <!-- <pre>{{ pokemon.locations }}</pre> -->
    </v-card>
  </div>
</template>

<script>
import Colors from "../../core/colors";
const StatusTab = () => import('./PokemonTabs/StatsTab.vue');
const AboutTab = () => import('./PokemonTabs/AboutTab.vue');

export default {
  name: "pokemon",
  components: {
    StatusTab,
    AboutTab
  },
  data: function () {
    return {
      tab: null,
      tabs:[
        {label:'About', component:'about-tab'},
        {label:'Stats', component:'status-tab'},
        {label:'Evolutions', component:''}
      ],
      loading: false,
      loadingSpecies: false,
      loadingLocations: false,
      pokemon: null,
    };
  },
  computed: {
    pokemonType(){
      return this.pokemon.types[0].type.name
    },
    pokemonId() {
      return `#${this.pokemon.id.toString().padStart(3, "0")}`;
    },
    elementColors() {
      return Colors.elementTypeColors;
    },
    bgElementColors() {
      return Colors.backgroundTypeColors;
    },
    pokemonSprite() {
      if(this.pokemon.sprites.other.official_artwork)
        return this.pokemon.sprites.other.official_artwork.front_default;
      else if(this.pokemon.sprites.other.dream_world)
        return this.pokemon.sprites.other.dream_world.front_default;
      else
        return this.pokemon.sprites.front_default
    },
  },
  methods: {
    chipSvgMas(typeName){
      return {
        backgroundColor: 'white',
        webkitMask: `url(${require(`@/assets/types/${typeName}.svg`)}) no-repeat center`,
        mask: `url(${require(`@/assets/types/${typeName}.svg`)}) no-repeat center`
      }
    },
    fetchData() {
      this.loading = true;

      this.$api
        .get(`https://pokeapi.co/api/v2/pokemon/${this.$route.params.id}`)
        .then((response) => {
          this.pokemon = response.data;
          
          this.$api.get(`${this.pokemon.location_area_encounters}`)
          .then((location) => {
            this.pokemon.locations = location.data

            this.$api.get(`${this.pokemon.species.url}`)
            .then((specie) => {
              this.pokemon.species.data = (({evolution_chain,flavor_text_entries, genera})=>({evolution_chain,flavor_text_entries, genera}))(specie.data)
              
              this.$api.get(`${this.pokemon.species.data.evolution_chain.url}`)
              .then((evolutions) => {
                this.pokemon.species.data.evolution_chain.data = evolutions.data
                  this.loading = false;
              })
            })
          })
        })
        .catch((e) => {
          this.errors.push(e);
          this.loading = false;
        });
        
    },
  },
  beforeMount() {
     this.fetchData();
  },
};
</script>

<style>
.poke-tab{
  background-color: blue;
}
</style>