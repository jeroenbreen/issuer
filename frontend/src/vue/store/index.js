import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import {Company} from "./models/Company";

Vue.use(Vuex);

const state = {
    company: null
};

const mutations = {
    initCompany(state, company) {
        state.company = new Company(company);
    }
};

export default new Vuex.Store({
    company: null,
    state,
    mutations,
    modules: {
        users
    },
    strict: true
})

