import Vue from 'vue'
import Vuex from 'vuex'
import settings from './modules/settings'
import templateEditor from './modules/template-editor'
import templates from './modules/templates'
import users from './modules/users'
import clients from './modules/clients'
import repositories from './modules/repositories'
import projects from './modules/projects'
import issues from './modules/issues'
import documents from './modules/documents'
import statuses from './modules/statuses'
import {Company} from "./models/Company";
import _base from "./modules/_base-module";


Vue.use(Vuex);

const getters = {
    template: (state, getters, rootState) => (type) => {
        const getTemplate = getters['templates/getItemById'];
        return getTemplate(rootState.settings['template_' + type + '_id']);
    }
};

const state = {
    company: null,
    modal: {
        show: false,
        type: '',
        message: '',
        callback: null,
        buttons: {
            yes: 'yes',
            no: 'no'
        }
    }
};

const actions = {
    updateCompany(context, item){
        return _base.actions.update(context, item, 'company');
    }
};

const mutations = {
    // company
    initCompany(state, company) {
        state.company = new Company(company);
    },
    update(state, item) {
        state.company = new Company(item);
    },

    // modal
    message(state, modalObject) {
        state.modal.show = true;
        state.modal.type = 'message';
        state.modal.message = modalObject.message;
        state.modal.callback = null;
    },
    confirm(state, modalObject) {
        state.modal.show = true;
        state.modal.type = 'confirm';
        state.modal.message = modalObject.message;
        if (modalObject.callback) {
            state.modal.callback = modalObject.callback;
        } else {
            state.modal.callback = null;
        }
        if (modalObject.buttons && modalObject.buttons.yes) {
            state.modal.buttons.yes = modalObject.buttons.yes;
        } else {
            state.modal.buttons.yes = 'yes';
        }
        if (modalObject.buttons && modalObject.buttons.no) {
            state.modal.buttons.no = modalObject.buttons.no;
        } else {
            state.modal.buttons.no = 'no';
        }

    },
    closeModal(state) {
        state.modal = {
            show: false,
            type: '',
            message: '',
            callback: null,
            buttons: {
                yes: 'yes',
                no: 'no'
            }
        }
    }
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        settings,
        templateEditor,
        templates,
        users,
        clients,
        projects,
        repositories,
        issues,
        documents,
        statuses
    },
    strict: true
})

