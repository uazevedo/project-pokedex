import Vue from 'vue'
import Vuex from 'vuex'

import store from '../views/Pokemon/store/pokemon.store'

Vue.use(Vuex);


export default new Vuex.Store({
    modules:{
        store
    }
})