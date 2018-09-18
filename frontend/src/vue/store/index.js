import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import clients from './modules/clients'
import repositories from './modules/repositories'
import projects from './modules/projects'
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
    state,
    mutations,
    modules: {
        users,
        clients,
        projects,
        repositories
    },
    strict: true
})

