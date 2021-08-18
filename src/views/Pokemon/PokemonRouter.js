import PokemonList from './PokemonList.vue'
import Pokemon from './Pokemon.vue'

export default [
    {path: '/pokemon', name: 'pokemon-list',component: PokemonList},
    {path: '/pokemon/:id', name:'pokemon-detail', component:Pokemon}
];