const state = {
    currentItem: null
};



const getters = {

};

const actions = {

};

const mutations = {
    setCurrentItem(state, item) {
        state.currentItem = item;
    },
    unsetCurrentItem(state) {
        state.currentItem = null;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}