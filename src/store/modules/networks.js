/* eslint-disable no-await-in-loop */
import http from '../../services/http-common';

const networks = {
  state: () => ({
    layers: [],
    isInput: false,
    isOutput: false,
  }),
  getters: {
    LAYERS: (state) => state.layers,
    IS_INPUT: (state) => state.isInput,
    IS_OUTPUT: (state) => state.isOutput,
  },
  mutations: {
    ADD_LAYERS(state, layers) {
      state.layers = layers;
    },
    CHANGE_IS_INPUT(state, bool) {
      state.isInput = bool;
    },
    CHANGE_IS_OUTPUT(state, bool) {
      state.isOutput = bool;
    },
  },
  actions: {
    async GET_LAYERS({ commit }) {
      try {
        const res = await http.get('networks');
        commit('ADD_LAYERS', res.data);
      } catch (e) {
        console.log(e);
      }
    },
    async ADD_LAYER({ dispatch }, layer) {
      try {
        await http.post('networks', layer);
        dispatch('GET_LAYERS');
      } catch (e) {
        console.log(e);
      }
    },
    async REMOVE_LAYER({ dispatch }, id) {
      try {
        await http.delete(`networks/${id}`);
        dispatch('GET_LAYERS');
      } catch (e) {
        console.log(e);
      }
    },
    async EDIT_LAYER({ dispatch }, payload) {
      try {
        await http.patch(`networks/${payload.id}`, payload.layerData);
        dispatch('GET_LAYERS');
      } catch (e) {
        console.log(e);
      }
    },
    async REMOVE_ALL_LAYERS({ commit, getters, dispatch }) {
      try {
        const arrIDs = [];
        getters.LAYERS.forEach((item) => {
          arrIDs.push(item.id);
        });
        // eslint-disable-next-line no-restricted-syntax
        for (const id of arrIDs) {
          await http.delete(`networks/${id}`);
        }
        dispatch('GET_LAYERS');
        commit('CHANGE_IS_INPUT', false);
        commit('CHANGE_IS_OUTPUT', false);
      } catch (e) {
        console.log(e);
      }
    },
  },
  namespaced: true,
};

export default networks;
