import Vue from 'vue'
import Vuex from 'vuex'
import settings from './modules/settings'
import templates from './modules/templates'
import users from './modules/users'
import clients from './modules/clients'
import repositories from './modules/repositories'
import projects from './modules/projects'
import issues from './modules/issues'
import documents from './modules/documents'
import {Company} from "./models/Company";

Vue.use(Vuex);

const getters = {
    template(state, getters, rootState) {
        const getTemplate = getters['templates/getItemById'];
        return getTemplate(rootState.settings.template_id);
    }
};

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
    getters,
    mutations,
    modules: {
        settings,
        templates,
        users,
        clients,
        projects,
        repositories,
        issues,
        documents
    },
    strict: true
})

