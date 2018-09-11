import Vue from 'vue';
import {userComponent} from './../../shared/user/user';
import {employeeCardComponent} from './employee-card/employee-card';


const employeesComponent = Vue.component('employees', {
    methods: {
        getUsers: function(){
            return this.$store.state.users.all;
        },
        getCurrentUser: function() {
            return this.$store.state.users.currentUser;
        },
        addUser: function() {
            this.$router.push('employees/new');
        }
    },
    template: `
        <div class="page page--employees">
            <h1>
            Employees
            </h1>
            <div class="employee-cards">
                <employee-card 
                    v-for="user in getUsers()" 
                    v-bind:key="user.id"
                    v-bind:user="user"></employee-card>
            </div>
            
            <button v-on:click="addUser()">
                Add employee
            </button>
        </div>
    `
});

export {employeesComponent}

