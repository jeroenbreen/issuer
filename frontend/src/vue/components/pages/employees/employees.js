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
        addUser: function() {
            this.$router.push('employees/new')
        }
    },
    template: `
        <div class="page page--employees">
            <h1>
            Employees
            </h1>
            <user 
                v-for="user in getUsers()" 
                v-bind:key="user.id"
                v-bind:user="user"></user>
            <button v-on:click="addUser()">
                Add employee
            </button>
        </div>
    `
});

export {employeesComponent}

