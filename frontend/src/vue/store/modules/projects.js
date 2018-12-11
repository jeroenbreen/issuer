import {Project} from './../models/Project';
import _base from './_base-module';

const route = 'projects';
const Model = Project;

const state = {
    all: [],
    current: null,
    currentId: null
};

const getters = {
    ..._base.getters,
    getAllSorted: (state, getters, rootState, rootGetters) => () => {
        return [...state.all].sort((a, b) => {

            function getStatus(item) {
                return rootGetters['statuses/getItemById'](item.status_id);
            }
            return getStatus(a).order - getStatus(b).order;
        });
    }
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
    }
};

const mutations = {
    init(state, set) {
        return _base.mutations.init(state, set, Model);
    },
    setCurrent(state, item) {
        return _base.mutations.setCurrent(state, item)
    },
    setCurrentById(state, id) {
        return _base.mutations.setCurrentById(state, id)
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