<template>
  <div id="app">
    <v-app>
      <div id="nav">
        <v-navigation-drawer app>
          <router-link to="/pokemon">Pokemon</router-link> <br />
          <router-link to="/pokemon/1">Pokemon Detail</router-link> <br />
          <router-link to="/home">Home</router-link> <br />
        </v-navigation-drawer>
      </div>
      <v-main>
        <v-container fluid>
          <v-row>
            <v-col lg="6" offset-lg="3" sm="8" offset-sm="2" xs="12" offset-xs="0">
              <router-view />
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

