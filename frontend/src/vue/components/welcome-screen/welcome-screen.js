import Vue from 'vue';
import {userComponent} from './../shared/user/user';


const welcomeScreenComponent = Vue.component('welcome-screen', {
    methods: {
        setCurrent: function(user) {
            this.$store.commit('users/setCurrent', user);
        },
        // todo user getters
        getUsers: function() {
            return this.$store.state.users.all;
        },
        getCurrentUser: function() {
            return this.$store.state.users.currentUser;
        },
        getGreeting: function() {
            let date = new Date(),
                curHr = date.getHours();
            if (curHr < 12) {
                return 'Good morning';
            } else if (curHr < 18) {
                return 'Good afternoon';
            } else {
                return 'Good evening';
            }

        }
    },
    template: `
        <div class="welcome-screen">
            <h3>{{getGreeting()}}</h3>
            <user 
                v-for="user in getUsers()" 
                v-on:click.native="setCurrent(user)" 
                v-bind:key="user.id"
                v-bind:user="user"
                v-bind:class="{'user--current': (user === getCurrentUser())}"></user>
        </div>
    `
});

export {welcomeScreenComponent}

