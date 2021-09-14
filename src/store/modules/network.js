const network = {
  state: () => ({
    layers: [],
    isInput: false,
    isOutput: false,
  }),
  getters: {
    LAYERS(state) {
      return state.layers;
    },
    IS_INPUT(state) {
      return state.isInput;
    },
    IS_OUTPUT(state) {
      return state.isOutput;
    },
  },
  mutations: {
    ADD_LAYERS(state, layers) {
      state.layers = layers;
    },
    ADD_FLAGS(state, flags) {
      state.isInput = flags.input;
      state.isOutput = flags.output;
    },
    ADD_LAYER(state, layer) {
      state.layers = [...state.layers, layer];
    },
    ADD_BETWEEN_LAYERS(state, layer) {
      state.layers.splice(1, 0, layer);
    },
    CHANGE_IS_INPUT(state, bool) {
      state.isInput = bool;
    },
    CHANGE_IS_OUTPUT(state, bool) {
      state.isOutput = bool;
    },
    REPLACE_LAYER_DATA(state, payload) {
      state.layers.splice(payload.index, 1, payload.layerData);
    },
    REMOVE_LAYER(state, i) {
      state.layers.splice(i, 1);
    },
    REMOVE_LAYERS(state) {
      state.layers = [];
    }
  },
  actions: {
    GET_LAYERS_FROM_LOCALSTORAGE({commit}) {
      if (localStorage.getItem('layers') && localStorage.getItem('flags')) {
        commit('ADD_LAYERS', JSON.parse(localStorage.layers))
        commit('ADD_FLAGS', JSON.parse(localStorage.flags))
      }
    },
    SET_LAYERS_TO_LOCALSTORAGE({getters}) {
      localStorage.setItem('layers', JSON.stringify(getters.LAYERS))
      localStorage.setItem('flags', JSON.stringify({
          'input': getters.IS_INPUT,
          'output': getters.IS_OUTPUT
        }
      ))
    },
    DELETE_LAYERS_FROM_LOCALSTORAGE() {
      localStorage.removeItem('layers');
      localStorage.removeItem('flags');
    },
    REMOVE_ALL_LAYERS({dispatch, commit}) {
      commit('REMOVE_LAYERS');
      dispatch('DELETE_LAYERS_FROM_LOCALSTORAGE');
      commit('CHANGE_IS_INPUT', false);
      commit('CHANGE_IS_OUTPUT', false);
    }
  },
  namespaced: true
}

export default network;