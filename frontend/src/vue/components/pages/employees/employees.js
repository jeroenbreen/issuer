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
            <div class="page-section">
                <h1>
                Employees
                </h1>
            </div>
            <div class="page-section">
                <div class="employee-cards">
                    <employee-card 
                        v-for="user in getAll()" 
                        v-bind:key="user._id"
                        v-bind:user="user"></employee-card>
                </div>
            </div>
            
            <div class="page-section">
                <md-button v-on:click="create()" class="md-primary">Create Employee</md-button>
            </div>
        </div>
    `
});

export {employeesComponent}

