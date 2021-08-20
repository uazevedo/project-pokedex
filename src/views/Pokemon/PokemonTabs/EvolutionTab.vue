<template>
  <v-card-text>
    <v-list>
      <v-list-item-title
        class="text-h6"
        :style="{ color: colors.get(pokemonType) }"
      >
        <v-icon :color="colors.get(pokemonType)">mdi-pokeball</v-icon>
        Evolution Chain
      </v-list-item-title>

      <v-list-item class="grey--text text--darken-2">
        <v-container>
          <v-row>
            <v-col md="auto" v-if="pokemonEvolutionChain.species">
              {{ pokemonEvolutionChain.species.name }}
            </v-col>
            <v-col md="auto" v-if="pokemonEvolutionChain.evolves_to.length > 0">
              Level
              {{
                pokemonEvolutionChain.evolves_to[0].evolution_details[0]
                  .min_level
              }}
            </v-col>
            <v-col md="auto" v-if="pokemonEvolutionChain.evolves_to.length > 0">
              {{ pokemonEvolutionChain.evolves_to[0].species.name }}
            </v-col>
          </v-row>

          <v-row>
            <v-col md="auto" v-if="pokemonEvolutionChain.evolves_to.length > 0">
              {{ pokemonEvolutionChain.evolves_to[0].species.name }}
            </v-col>
            <v-col md="auto" v-if="pokemonEvolutionChain.evolves_to.length > 0">
              Level
              {{
                pokemonEvolutionChain.evolves_to[0].evolves_to[0]
                  .evolution_details[0].min_level
              }}
            </v-col>
            <v-col md="auto" v-if="pokemonEvolutionChain.evolves_to.length > 0">
              {{
                pokemonEvolutionChain.evolves_to[0].evolves_to[0].species.name
              }}
            </v-col>
          </v-row>
        </v-container>
      </v-list-item>
    </v-list>
  </v-card-text>
</template>

<script>
import Colors from "../../../core/colors";

export default {
  name: "evolution-tab",
  props: ["pokemon"],
  data: function() {
    return {};
  },
  computed: {
    pokemonEvolutionChain() {
      return this.pokemon.species.data.evolution_chain.data.chain;
    },
    colors() {
      return Colors.elementTypeColors;
    },
    pokemonType() {
      return this.pokemon.types[0].type.name;
    },
  },
  methods: {
    shortedNameArea(areaName) {
      if (areaName) {
        let shortedName = areaName.split("-");
        return shortedName.join(" ").replace("area", "");
      } else return "Location Not Found";
    },
    shortedNameStatus(statusName) {
      let shortedName = statusName.split("-");
      if (shortedName.length > 1)
        return `${shortedName[0].substring(0, 2)}. ${shortedName[1]}`;
      else return statusName;
    },
  },
};
</script>

<style></style>
