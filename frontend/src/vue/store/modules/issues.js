import {Issue} from './../models/Issue';
import _base from './_base-module';
import $ from "jquery";

const route = 'projects';
const Model = Issue;

const state = {
    all: [],
    current: null
};

const getters = {
    ..._base.getters
};

const actions = {
    create(context, item){
        return _base.actions.create(context, item, route);
    },
    update(context, item){
        return _base.actions.update(context, item, route);
    },
    delete(context, item){
        return _base.actions.delete(context, item, route);
    },
    read(context, githubKey) {
        const url = 'https://api.github.com/issues?per_page=100&access_token=' + githubKey;
        $.ajax({
            'url': url,
            'type': 'GET',
            'headers': {
                'Accept': 'application/json'
            }
        }).done(function(response){
            context.commit('init', response);
        });
    }
};

const mutations = {
    init(state, set) {
        return _base.mutations.init(state, set, Model);
    },
    setCurrent(state, item) {
        return _base.mutations.setCurrent(state, item)
    },
    create(state, item) {
        return _base.mutations.create(state, item, Model);
    },
    update(state, item) {
        return _base.mutations.update(state, item, Model);
    },
    delete(state, item) {
        return _base.mutations.delete(state, item)
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}