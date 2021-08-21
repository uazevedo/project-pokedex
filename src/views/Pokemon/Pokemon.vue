<template>
  <div>
    <v-card v-if="!loading" class="mx-auto">
      <v-sheet :color="bgElementColors.get(pokemonType(pokemon))" class="skewBefore">
        <v-row no-gutters>
          <v-col cols="6">
            <router-link to="/pokemon">
              <v-btn depressed icon class="float-start">
                <v-icon color="white">mdi-arrow-left</v-icon>
              </v-btn>
            </router-link>
            <v-list-item three-line class="px-0 pt-12">
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
                      :color="elementColors.get(type.type.name)"
                    >
                      <v-avatar dark class="mr-1">
                        <v-img
                          contain
                          :style="chipSvgType(type.type.name)"
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
              min-height="200"
              max-height="100%"
              :src="getPokemonSprite"
              :alt="pokemon.name"
              class="ma-10 imgPokemon"
              contain
            >
            </v-img>
          </v-col>
        </v-row>
      </v-sheet>
    </v-card>

    <v-card
      color="white"
      class="mx-auto rounded-xl mt-n5"
      v-if="!loading"
      min-height="430"
    >
      <v-tabs fixed-tabs center-active v-model="tab">
        <v-tab v-for="(tab, i) in tabs" :key="i">{{ tab.label }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(tab, i) in tabs" :key="i">
          <component
            v-if="!loading"
            :pokemon="pokemon"
            :is="tab.component"
          ></component>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import pokemonMixin from "./mixins/pokemon.mixin";
const StatusTab    = () => import("./PokemonTabs/StatsTab.vue");
const AboutTab     = () => import("./PokemonTabs/AboutTab.vue");
const EvolutionTab = () => import("./PokemonTabs/EvolutionTab.vue");

export default {
  name: "pokemon",
  mixins:[pokemonMixin],
  components: {
    StatusTab,
    AboutTab,
    EvolutionTab,
  },
  data: function () {
    return {
      tab: null,
      tabs: [
        { label: "About", component: "about-tab" },
        { label: "Stats", component: "status-tab" },
        { label: "Evolutions", component: "evolution-tab" },
      ],
      loading: false,
      loadingSpecies: false,
      loadingLocations: false,
    };
  },
  methods: {
    fetchData() {
      this.$store.dispatch("initPokemon", this.$route.params.id);
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style>
</style>