import Vue from 'vue';
import {User} from './../../../../store/models/User';


const newEmployeeComponent = Vue.component('new-employee', {
    data() {
        return {
            employee: new User()
        }
    },
    methods: {
        addEmployee: function() {
            this.$store.dispatch('users/addUser', this.employee);
        }
    },
    template: `
        <div class="page page--new-employee">
            <h1>
                New Employee
            </h1>
            <input v-model="employee.firstName" placeholder="First Name"><br>
            <input v-model="employee.lastName" placeholder="Last Name"><br>
            <input v-model="employee.initials" placeholder="Initials"><br>
            <input v-model="employee.thumbnail" placeholder="Thumbnail"><br>
            <input v-model="employee.email" placeholder="Email"><br>
            <input v-model="employee.ghithubId" placeholder="Github ID"><br><br>
            <button v-on:click="addEmployee()">Add employee</button>
        </div>
    `
});

export {newEmployeeComponent}

