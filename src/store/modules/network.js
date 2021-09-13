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
        ADD_LAYER(state, layer) {
            state.layers = [...state.layers, layer];
        },
        ADD_BETWEEN_LAYERS(state, layer) {
            state.layers.splice(1, 0, layer);
        },
        CHANGE_IS_INPUT(state) {
            state.isInput = true;
        },
        CHANGE_IS_OUTPUT(state) {
            state.isOutput = true;
        }
    },
    actions: {},
    namespaced: true
}

export default network;