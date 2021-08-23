import Vue from 'vue'
import VueRouter from 'vue-router'
import PokemonRouter from '../views/Pokemon/pokemon.router'

Vue.use(VueRouter)

const baseRoutes = [
  {
    path: '/',
    redirect: '/pokemon'
  },
  { path: '*', redirect: '/pokemon' }
  
]

const routes = baseRoutes.concat(PokemonRouter)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(function (to, from, next) { 
  setTimeout(() => {
      window.scrollTo(0, 0);
  }, 100);
  next();
});

export default router
