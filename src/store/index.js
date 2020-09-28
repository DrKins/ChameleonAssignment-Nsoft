import Vuex from 'vuex';
import Vue from 'vue';
import data from './modules/data.js';
import DragDropTouch from '../DragDropTouch'

Vue.use(Vuex);
Vue.use(DragDropTouch)
export default new Vuex.Store({
    modules : {
        data,
    }
});