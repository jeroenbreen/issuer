import {Status} from './../models/project/Status';
import _base from './_base-module';

const route = 'templates';
const Model = Status;

const state = {
    all: [],
    current: null
};

const getters = {
    ..._base.getters,
    getInOrder: (state) => (order, direction) => {
        let newStatus = null;
        for (let status of state.all) {
            if (direction === 1) {
                if (status.order > order && (!newStatus || status.order < newStatus.order)) {
                    newStatus = status;
                }
            } else {
                if (status.order < order && (!newStatus || status.order > newStatus.order)) {
                    newStatus = status;
                }
            }
        }
        return newStatus;
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
    unsetCurrent(state, item) {
        return _base.mutations.unsetCurrent(state, item)
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