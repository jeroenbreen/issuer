// initial state
const state = {
    all: [],
    currentUser: null
};

// getters
const getters = {
    getUsers(state) {
        return state.all;
    }
};

// actions
const actions = {
    // getAllProducts ({ commit }) {
    //     // api.getProducts(products => {
    //     //     commit('setProducts', products)
    //     // })
    // }
};

// mutations
const mutations = {
    init(state, users) {
        state.all = users;
    },

    setCurrentUser(state, currentUser) {
        state.currentUser = currentUser;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}