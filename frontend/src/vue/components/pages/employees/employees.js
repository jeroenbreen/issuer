import Vue from 'vue';
import {employeeCardComponent} from './employee-card/employee-card';


const employeesComponent = Vue.component('employees', {
    methods: {
        getAll: function(){
            return this.$store.state.users.all;
        },
        getCurrent: function() {
            return this.$store.state.users.currentUser;
        },
        create: function() {
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
                    v-for="user in getAll()" 
                    v-bind:key="user._id"
                    v-bind:user="user"></employee-card>
            </div>
            
            <div class="iss-button" v-on:click="create()">
                Create Employee
            </div>
        </div>
    `
});

export {employeesComponent}

