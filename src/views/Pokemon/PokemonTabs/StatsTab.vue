<template>
  <v-card-text>
    <v-list>
      <v-list-item-title
        class="text-h6"
        :style="{ color: colors.get(pokemonType) }"
      >
        <v-icon :color="colors.get(pokemonType)">mdi-pokeball</v-icon>
        Base Status
      </v-list-item-title>
      <v-list-item-group>
        <v-list-item
          v-for="(stats, i) in pokemon.stats"
          :key="i"
          class="grey--text text--darken-2"
        >
          <v-list-item-title class="text-capitalize">
            {{ shortedNameStatus(stats.stat.name) }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ stats.base_stat }}
          </v-list-item-subtitle>
          <v-spacer></v-spacer>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card-text>
</template>

<script>
import Colors from "../../../core/colors";

export default {
  name: "status-tab",
  props: ["pokemon"],
  data: function() {
    return {};
  },
  computed: {
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
