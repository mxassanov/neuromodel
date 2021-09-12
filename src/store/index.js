import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {},
    state: {
        datasets: [],
        tagForFilter: '',
    },
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
                const res = await axios('http://localhost:3000/datasets');
                commit('SET_DATASETS', res.data);
            } catch (e) {
                console.log(e)
            }
        },
        async ADD_DATASET({dispatch}, dataset) {
            try {
                await axios.post('http://localhost:3000/datasets', dataset, {
                    'Content-Type': 'application/json',
                })
                dispatch('GET_DATASETS');
            } catch (e) {
                console.log(e);
            }
        },
        async REMOVE_DATASET({dispatch}, id) {
            try {
                await axios.delete(`http://localhost:3000/datasets/${id}`);
                dispatch('GET_DATASETS')
            } catch (e) {
                console.log(e);
            }
        },
        async EDIT_DATASET({dispatch}, payload) {
            try {
                await axios.patch(`http://localhost:3000/datasets/${payload.id}`, payload.dataset, {
                    'Content-Type': 'application/json',
                });
                dispatch('GET_DATASETS')
            } catch (e) {
                console.log(e)
            }
        }
    }
})