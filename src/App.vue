<template>
  <div id="app">
    <v-app>
      <v-main>
        <v-container fluid>
          <v-row>
            <v-col
              lg="6"
              offset-lg="3"
              sm="8"
              offset-sm="2"
              xs="12"
              offset-xs="0"
            >
              <router-view :key="$route.fullPath"/>
            </v-col>
          </v-row>
          <!-- <pre>{{pokemonList}}</pre> -->
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "app",
  data: function () {
    return {};
  },
  created() {},
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