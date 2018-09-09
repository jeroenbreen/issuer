import Vue from 'vue';
import {userComponent} from './../../shared/user/user';


const employeesComponent = Vue.component('employees', {
    methods: {
        getUsers: function(){
            return this.$store.state.users.all;
        },
        getCurrentUser: function() {
            return this.$store.state.users.currentUser;
        },
    },
    template: `
        <div class="page page--employees">
            Employees
            <user 
                v-for="user in getUsers()" 
                v-bind:key="user.id"
                v-bind:user="user"></user>
        </div>
    `
});

export {employeesComponent}

