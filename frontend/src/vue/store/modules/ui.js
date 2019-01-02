const state = {
    menu: false
};

const getters = {

};

const actions = {};

const mutations = {

    toggleMenu(state) {
        state.menu = !state.menu;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}