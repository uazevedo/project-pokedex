import Vue from 'vue';
import axios from "axios";
import config from "../core/config";

Vue.use({
  install(Vue){
      Vue.prototype.$api = axios.create({
          baseUrl:config.baseApiUrl
      })
  }
});
