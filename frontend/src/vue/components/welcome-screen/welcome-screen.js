import Vue from 'vue';
import $ from 'jquery';
import {userComponent} from './user/user';

const welcomeScreenComponent = Vue.component('welcome-screen', {
    data: function(){
        return {
            currentUser: null
        };
    },
    methods: {
        selectUser: function(user) {
            this.model.setCurrentUser(user);
            $(this.$el).fadeOut(500);
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
    props: ['model'],
    template: `
        <div class="welcome-screen">
            <h3>{{getGreeting()}}</h3>
            <user 
                v-for="user in model.users" 
                v-on:click.native="selectUser(user)" 
                v-bind:key="user.id"
                v-bind:user="user"
                v-bind:class="{'user--current': (user === model.currentUser)}"></user>
        </div>
    `
});

export {welcomeScreenComponent}

