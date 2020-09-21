import Vuex from 'vuex';
import Vue from 'vue';
import data from './modules/data.js';

Vue.use(Vuex);
export default new Vuex.Store({
    modules : {
        data,
    }
});