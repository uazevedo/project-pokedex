import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PokemonRouter from '../views/Pokemon/PokemonRouter'

Vue.use(VueRouter)

const baseRoutes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  { path: '*', redirect: '/pokemon' }
  
]

const routes = baseRoutes.concat(PokemonRouter)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
