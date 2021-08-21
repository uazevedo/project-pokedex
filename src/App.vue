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
              <router-view />
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
