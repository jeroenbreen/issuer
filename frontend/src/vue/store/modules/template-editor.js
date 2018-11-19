const state = {
    // currently storing the index instead of the item itself
    // this is a way to avoid storing part of the edited template
    // in the store. Open for discussion to find a better way for this.
    currentItemIndex: null
};



const getters = {

};

const actions = {

};

const mutations = {
    setCurrentItemIndex(state, index) {
        state.currentItemIndex = index;
    },
    unsetCurrentItemIndex(state) {
        state.currentItemIndex = null;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}