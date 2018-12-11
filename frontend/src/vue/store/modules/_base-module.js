import {storeToFile, getObjectId} from '@root/vue/store/store-functions'
import $ from "jquery";


function saveInLocalStorage(state) {
    let file = storeToFile(state);
    localStorage.setItem('doculator', JSON.stringify(file));
}



const getters = {
    getAll(state) {
        return state.all;
    },
    getItemById: (state) => (id) => {
        return state.all.find(item => item._id === id);
    },
    getItemByProperty: (state) => (property, value) => {
    return state.all.find(item => item[property] === value);
    }
};

const actions = {
    create(context, item, route) {
        return new Promise((resolve, reject) => {
            if (config.useBackend) {
                $.ajax({
                    'url': (config.backend + route),
                    'type': 'POST',
                    'data': JSON.stringify(item),
                    'headers': {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).done(function(response){
                    context.commit('create', response);
                    resolve(response);
                });
            } else {
                getObjectId().then((id) => {
                    item._id = id;
                    context.commit('create', item);
                    resolve(item);

                    if (config.useLocalStorage) {
                        saveInLocalStorage(context.rootState);
                    }
                });
            }
        })
    },
    update(context, item, route) {
        return new Promise((resolve, reject) => {
            if (config.useBackend) {
                $.ajax({
                    'url': (config.backend + route + '/' + item._id),
                    'type': 'PUT',
                    'data': JSON.stringify(item),
                    'headers': {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).done(function (response) {
                    context.commit('update', response);
                    resolve();
                });
            } else {
                context.commit('update', item);
                resolve();

                if (config.useLocalStorage) {
                    saveInLocalStorage(context.rootState);
                }
            }
        })
    },
    delete(context, item, route) {
        return new Promise((resolve, reject) => {
            if (config.useBackend) {
                $.ajax({
                    'url': (config.backend + route + '/' + item._id),
                    'type': 'DELETE',
                    'headers': {
                        'Accept': 'application/json'
                    }
                }).done(function (response) {
                    context.commit('delete', item);
                    resolve();
                });
            } else {
                context.commit('delete', item);
                resolve();

                if (config.useLocalStorage) {
                    saveInLocalStorage(context.rootState);
                }
            }
        })
    }
};

const mutations = {
    init(state, set, Model) {
        state.all = [];
        for (let item of set) {
            state.all.push(new Model(item));
        }
    },
    setCurrentById(state, id) {
        state.currentId = id;
    },
    setCurrent(state, item) {
        state.current = item;
    },
    unsetCurrent(state) {
        state.current = null;
    },
    create(state, item, Model) {
        state.all.push(new Model(item));
    },
    update(state, item, Model) {
        let newState = [];
        for (let thisItem of state.all) {
            if (thisItem._id === item._id) {
                // the cloning is need otherwise we could be editing directly the state
                newState.push(new Model({...item}));
            } else {
                newState.push(thisItem);
            }
        }
        state.all = newState;
    },
    delete(state, item) {
        state.all = state.all.filter(function(thisItem){
            return thisItem._id !== item._id;
        });
    }
};

export default {
    getters,
    actions,
    mutations
}
