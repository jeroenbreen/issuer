import {User} from './../models/User';
import $ from 'jquery';

const state = {
    all: [],
    currentUser: null
};

const getters = {
    getUsers(state) {
        return state.all;
    },
    getUserById: (state) => (id) => {
        return state.all.find(user => user._id === id);
    }
};

const actions = {
    create(context, user) {
        delete user._id;
        $.ajax({
            'url': (config.backend + 'users'),
            'type': 'POST',
            'data': user,
            'headers': {
                'Accept': 'application/json'
            }
        }).done(function(response){
            user._id = response._id;
            context.commit('create', user);
        });
    },
    update(context, user) {
        $.ajax({
            'url': (config.backend + 'users/' + user._id),
            'type': 'PUT',
            'data': user,
            'headers': {
                'Accept': 'application/json'
            }
        }).done(function(response){
            context.commit('update', user);
        });
    },
    delete(context, user) {
        $.ajax({
            'url': (config.backend + 'users/' + user._id),
            'type': 'DELETE',
            'data': user,
            'headers': {
                'Accept': 'application/json'
            }
        }).done(function(response){
            context.commit('delete', user);
        });
    }
};

const mutations = {
    init(state, users) {
        for (let user of users) {
            state.all.push(new User(user));
        }
    },
    setCurrentUser(state, currentUser) {
        state.currentUser = currentUser;
    },

    create(state, user) {
        state.all.push(user)
    },
    update(state, user) {
        let newState = [];

        for (let u of state.all) {
            if (u._id === user._id) {
                console.log("!");
                newState.push(new User({...user}));
            } else {
                newState.push(u);
            }
        }
        state.all = newState;
    },
    delete(state, user) {
        let index = state.all.indexOf(user);
        if (index > -1) {
            state.all.splice(index, 1);
        }
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}