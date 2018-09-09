import {User} from './../models/User';

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
const actions = {};

// mutations
const mutations = {
    init(state, users) {
        for (let user of users) {
            state.all.push(new User(user));
        }
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