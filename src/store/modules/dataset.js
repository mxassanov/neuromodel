import http from '../../services/http-common';

const dataset = {
  state: () => ({
    datasets: [],
    tagForFilter: '',
    isLoading: false,
  }),
  getters: {
    DATASETS(state) {
      return state.datasets;
    },
    TAG_FOR_FILTER(state) {
      return state.tagForFilter;
    },
    IS_LOADING(state) {
      return state.isLoading;
    },
  },
  mutations: {
    SET_DATASETS: (state, datasets) => {
      state.datasets = datasets;
    },
    SET_TAG_FOR_FILTER(state, tag) {
      state.tagForFilter = tag;
    },
    LOADING_STATUS(state, bool) {
      state.isLoading = bool;
    },
  },
  actions: {
    async GET_DATASETS({ commit }) {
      try {
        commit('LOADING_STATUS', true);
        const res = await http.get('datasets');
        commit('SET_DATASETS', res.data);
      } catch (e) {
        console.log(e);
      } finally {
        commit('LOADING_STATUS', false);
      }
    },
    async ADD_DATASET({ dispatch }, dataset) {
      try {
        await http.post('datasets', dataset);
        dispatch('GET_DATASETS');
      } catch (e) {
        console.log(e);
      }
    },
    async REMOVE_DATASET({ dispatch }, id) {
      try {
        await http.delete(`datasets/${id}`);
        dispatch('GET_DATASETS');
      } catch (e) {
        console.log(e);
      }
    },
    async EDIT_DATASET({ dispatch }, payload) {
      try {
        await http.patch(`datasets/${payload.id}`, payload.dataset);
        dispatch('GET_DATASETS');
      } catch (e) {
        console.log(e);
      }
    },
  },
  namespaced: true,
};

export default dataset;
