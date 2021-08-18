import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import CustomIcon from '../shared/components/customIcons/customIcon.vue'
Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        values: {
          custom: { // name of our custom icon
            component: CustomIcon, // our custom component
          },
        },
    }
});
