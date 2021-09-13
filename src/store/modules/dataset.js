import http from "../../services/http-common";

const dataset = {
    namespaced: true,
    state: () => ({
        datasets: [],
        tagForFilter: '',
    }),
    getters: {
        DATASETS(state) {
            return state.datasets;
        },
        TAG_FOR_FILTER(state) {
            return state.tagForFilter;
        }
    },
    mutations: {
        SET_DATASETS: (state, datasets) => {
            state.datasets = datasets;
        },
        SET_TAG_FOR_FILTER (state, tag) {
            state.tagForFilter = tag;
        }
    },
    actions: {
        async GET_DATASETS({commit}) {
            try {
                const res = await http.get('datasets');
                commit('SET_DATASETS', res.data);
            } catch (e) {
                console.log(e)
            }
        },
        async ADD_DATASET({dispatch}, dataset) {
            try {
                await http.post('datasets', dataset)
                dispatch('GET_DATASETS');
            } catch (e) {
                console.log(e);
            }
        },
        async REMOVE_DATASET({dispatch}, id) {
            try {
                await http.delete(`datasets/${id}`);
                dispatch('GET_DATASETS')
            } catch (e) {
                console.log(e);
            }
        },
        async EDIT_DATASET({dispatch}, payload) {
            try {
                await http.patch(`datasets/${payload.id}`, payload.dataset);
                dispatch('GET_DATASETS')
            } catch (e) {
                console.log(e)
            }
        }
    }
}

export default dataset;