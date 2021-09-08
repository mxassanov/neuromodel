import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {},
  state: {
    datasets: []
  },
  mutations: {
    SET_DATASETS: (state, datasets) => {
      state.datasets = datasets;
    }
  },
  actions: {
      GET_DATASETS({commit}) {
        return axios('http://localhost:3000/datasets', {
          method: "GET"
        })
        .then((datasets) => {
            commit('SET_DATASETS', datasets.data)
            return datasets;
        })
        .catch((err) => {
          console.log(err)
          return err;
        })
      },
  },
  getters: {
    DATASETS(state) {
      return state.datasets;
    },
  },
})