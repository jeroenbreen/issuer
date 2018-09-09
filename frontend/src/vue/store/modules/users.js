import {User} from './../models/User';
import $ from 'jquery';

const state = {
    all: [],
    currentUser: null
};

const getters = {
    getUsers(state) {
        return state.all;
    }
};

const actions = {
    addUser(context, user) {
        delete user._id;
        $.ajax({
            'url': (config.backend + 'users/add'),
            'type': 'POST',
            'data': user,
            'headers': {
                'Accept': 'application/json'
            }
        }).done(function(response){
            console.log(response);
            user._id = response._id;
            context.commit('addUser', user);
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
    addUser(state, user) {
        state.all.push(user)
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}