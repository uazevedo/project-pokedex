import colors from "../../../core/colors";

const pokemonMixins = {
  computed: {
    pokemon() {
      return this.$store.getters.pokemon;
    },
    elementColors() {
      return colors.elementTypeColors;
    },
    bgElementColors() {
      return colors.backgroundTypeColors;
    },
    pokemonType() {
      return this.pokemon.types ? this.pokemon.types[0].type.name : "dark";
    },
    pokemonId() {
      return this.pokemon.id
        ? `#${this.pokemon.id.toString().padStart(3, "0")}`
        : "Pokemon Not Found";
    },
    getPokemonSprite() {
      if (this.pokemon.sprites) {
        let pokemonSprite;
        if (this.pokemon.sprites.other.official_artwork)
          pokemonSprite = this.pokemon.sprites.other.official_artwork
            .front_default;
        else if (this.pokemon.sprites.other.dream_world)
          pokemonSprite = this.pokemon.sprites.other.dream_world.front_default;
        else pokemonSprite = this.pokemon.sprites.front_default;
        return pokemonSprite;
      }
      return "";
    }
  },
  methods: {
    chipSvgMas(typeName) {
      return {
        backgroundColor: "white",
        webkitMask: `url(${require(`@/assets/types/${typeName}.svg`)}) no-repeat center`,
        mask: `url(${require(`@/assets/types/${typeName}.svg`)}) no-repeat center`,
      };
    },
  },
};

export default pokemonMixins;
