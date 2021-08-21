<template>
  <v-card-text>
        <v-card-subtitle>
            {{ pokemonFlavorText }}
        </v-card-subtitle>
    <v-list dense>
      <v-list-item-title
        class="text-h6"
        :style="{ color: colors.get(pokemonType) }"
      >
        <v-icon :color="colors.get(pokemonType)">mdi-pokeball</v-icon>
        Pokémon Data
      </v-list-item-title>
      <template>
        <v-list-item class="text-capitalize">
          <v-container>
            <v-row>
              <v-col md="2">
                Species:
              </v-col>
              <v-col md="auto">
                {{ pokemonSpecie }}
              </v-col>
            </v-row>
            <v-row>
              <v-col md="2">
                Height:
              </v-col>
              <v-col md="auto">
                {{ pokemon.height }}
              </v-col>
            </v-row>

            <v-row>
              <v-col md="2">
                Weight:
              </v-col>
              <v-col md="auto">
                {{ pokemon.weight }}
              </v-col>
            </v-row>
            <v-row>
              <v-col md="2">
                Abilities:
              </v-col>
              <v-col>
                <v-list-item
                  v-for="abilities in pokemon.abilities"
                  :key="abilities.ability.name"
                  class="px-0"
                >
                  <v-list-item-content class="px-0">
                    <v-list-item-title>
                      {{ abilities.ability.name }}
                    </v-list-item-title>
                    <small v-if="abilities.is_hidden">(hidden ability)</small>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-container>
        </v-list-item>
      </template>
    </v-list>

    <v-list dense>
      <v-list-item-title
        class="text-h6"
        :style="{ color: colors.get(pokemonType) }"
      >
        <v-icon :color="colors.get(pokemonType)">mdi-pokemon-go</v-icon>
        Location
      </v-list-item-title>
      <template v-if="pokemon.locations">
        <v-list-item
          two-line
          v-for="(location, i) in pokemon.locations"
          :key="i"
          class="text-capitalize"
        >

          <v-list-item-content>
            <v-list-item-title>
              {{ shortedNameArea(location.location_area.name) }}
            </v-list-item-title>
            <v-list-item-subtitle
              >{{ getPokemonVersions(location) }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-list-item-content v-else>
            <v-list-item-title>
                Location Not Found.
            </v-list-item-title>
        </v-list-item-content>
    </v-list>
  </v-card-text>
</template>
<script>
import Colors from "../../../core/colors";

export default {
  name: "about-tab",
  data: function() {
    return {};
  },
  computed: {
    pokemon(){
      return this.$store.getters.pokemon
    },
    pokemonFlavorText(){
      return this.pokemon.specieData ? this.pokemon.specieData.flavor_text_entries[0].flavor_text.replace('\f','') : 'Description Not Found'
    },
    pokemonSpecie(){
      if(this.pokemon.specieData){
        const specie = this.pokemon.specieData.genera.filter(
          (t) => t.language.name == "en"
        );
        return specie[0].genus;
      }
      return 'Specie not found'
    },
    colors() {
      return Colors.backgroundTypeColors;
    },
    pokemonType() {
      return this.pokemon.types ? this.pokemon.types[0].type.name : 'dark';
    },
  },
  methods: {
    getPokemonVersions(pokemon) {
      const versions = pokemon.version_details.map(
        (element) => element.version.name
      );
      return versions.join(", ");
    },
    shortedNameArea(areaName) {
        let shortedName = areaName.split("-");
        return shortedName.join(" ").replace("area", "");
    },
  },
};
</script>
<style></style>
