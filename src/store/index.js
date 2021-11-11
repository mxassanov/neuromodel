import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import dataset from './modules/dataset';
import networks from './modules/networks';

Vue.use(Vuex);

const networksState = createPersistedState();

export default new Vuex.Store({
  modules: {
    dataset,
    networks,
  },
  plugins: [networksState],
});
