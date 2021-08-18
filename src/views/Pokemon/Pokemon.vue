<template>
  <div>
    <v-card v-if="pokemon" class="mx-auto">
      <v-sheet :color="bgElementColors.get(pokemon.types[0].type.name)">
        <v-row no-gutters align="center">
          <router-link to="/pokemon">
            <v-btn depressed icon class="float-start">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </router-link>
          <v-col cclass="text-center">
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-subtitle
                  class="pt-12 pb-0 font-weight-bold pl-5 text-h6"
                >
                  {{ pokemonId }}
                </v-list-item-subtitle>
                <v-list-item-title
                  class="
                    pl-5
                    pb-0
                    text-capitalize
                    white--text
                    font-weight-black
                    text-h4
                  "
                >
                  {{ pokemon.name }}
                </v-list-item-title>
                <v-list-item-subtitle class="pl-5">
                  <v-chip-group>
                    <v-chip
                      label
                      class="text-capitalize px-2"
                      text-color="white"
                      v-for="(type, i) in pokemon.types"
                      :key="i"
                      :color="elementColors.get(type.type.name)"
                    >
                      <!-- <v-icon class="mx-1 white--text">$vuetify.icons.custom</v-icon> -->
                      <v-avatar dark class="mr-1">
                        <v-img
                          :src="require(`@/assets/types/${type.type.name}.svg`)"
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
              height="250"
              :src="pokemonSprite"
              :alt="pokemon.name"
              class="pr-12"
            >
            </v-img>
          </v-col>
        </v-row>
      </v-sheet>
    </v-card>

    <v-card color="white" class="mx-auto rounded-xl mt-n5">
      <v-card-text class="">
        <v-list v-if="pokemon.stats">
          <v-card-title class="text-h6 green--text text--accent-4">Base Status</v-card-title>
          <v-list-item-group>
            <v-list-item v-for="(stats, i) in pokemon.stats" :key="i" class="grey--text text--darken-2">
              <v-list-item-title class="text-capitalize">
                {{ stats.stat.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ stats.base_stat }}
              </v-list-item-subtitle>
              <v-spacer></v-spacer>
              <v-list-item-subtitle>
                100
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                200
              </v-list-item-subtitle>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
      <!-- <pre>{{ pokemon }}</pre> -->
    </v-card>
  </div>
</template>

<script>
import Colors from "../../core/colors";

export default {
  name: "pokemon",
  data: function () {
    return {
      loading: false,
      pokemon: null,
    };
  },
  computed: {
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
      return this.pokemon.sprites.front_default;
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fetchData();
      next();
    });
  },
  methods: {
    async fetchData() {
      this.loading = true;
      await this.$api
        .get(`https://pokeapi.co/api/v2/pokemon/${this.$route.params.id}`)
        .then((response) => {
          this.pokemon = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      this.loading = false;
    },
  },
  async created() {
    await this.fetchData();
  },
};
</script>

<style>
</style>