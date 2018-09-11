import Vue from 'vue';
import {employeeDetailComponent} from './../employee-details/employee-details';
import {User} from './../../../../store/models/User';


const employeeCreateComponent = Vue.component('new-employee', {
    data() {
        return {
            user: new User()
        }
    },
    methods: {
        createEmployee: function() {
            this.$store.dispatch('users/create', this.user);
        }
    },
    template: `
        <div class="page page--employee-create">
            <h1>
                New Employee
            </h1>
            <employee-detail v-bind:user="user"></employee-detail>
            <button v-on:click="createEmployee()">Add employee</button>
        </div>
    `
});

export {employeeCreateComponent}

