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

      <v-list-item class="grey--text text--darken-2 text-capitalize">
        <v-container v-if="pokemonEvolutionChain.evolves_to.length > 0">
          <v-row>
            <v-col md="auto" v-if="pokemonEvolutionChain.species">
              {{ pokemonEvolutionChain.species.name }}
            </v-col>

            <v-spacer></v-spacer>

            <v-col md="auto" >
              Level
              {{ pokemonEvolutionChain.evolves_to[0].evolution_details[0].min_level }}
            </v-col>

            <v-spacer></v-spacer>

            <v-col md="auto" v-if="pokemonEvolutionChain.evolves_to.length > 0">
              {{ pokemonEvolutionChain.evolves_to[0].species.name }}
            </v-col>
          </v-row>

          <v-row v-if="pokemonEvolutionChain.evolves_to[0].evolves_to.length > 0">
            <v-col md="auto">
              {{ pokemonEvolutionChain.evolves_to[0].species.name }}
            </v-col>

            <v-spacer></v-spacer>

            <v-col md="auto" >
              Level
              {{ pokemonEvolutionChain.evolves_to[0].evolves_to[0].evolution_details[0].min_level }}
            </v-col>

            <v-spacer></v-spacer>

            <v-col md="auto">
              {{ pokemonEvolutionChain.evolves_to[0].evolves_to[0].species.name }}
            </v-col>
          </v-row>
        </v-container>
        <v-list-item-title v-else>Evolution Not Found</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card-text>
</template>

<script>
import Colors from "../../../core/colors";

export default {
  name: "evolution-tab",
  data: function() {
    return {};
  },
  computed: {
    pokemon(){
      return this.$store.getters.pokemon;
    },
    pokemonEvolutionChain() {
      return this.pokemon.evolution_chain.chain;
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
