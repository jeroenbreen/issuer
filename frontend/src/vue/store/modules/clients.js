import {Client} from './../models/Client';
import _base from './_base-module';

const route = 'clients';
const Model = Client;

const state = {
    all: [],
    current: null
};

const getters = {
    ..._base.getters,
    getClientId: (state) => () => {
        if (state.all.length) {
            return Math.max.apply(Math, state.all.map(function (o) {
                return o.clientId;
            })) + 1;
        } else {
            return 1;
        }
    },
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