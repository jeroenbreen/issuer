import Vue from 'vue';
import {employeeDetailComponent} from './../employee-details/employee-details';
import {User} from './../../../../store/models/User';


const employeeUpdateComponent = Vue.component('new-employee', {
    data() {
        const getUserById = this.$store.getters['users/getUserById'];
        let id, user;
        id = this.$route.params.id;
        if (id) {
            user = getUserById(id);
            if (user) {
                return {
                    user: new User(user)
                }
            } else {
                return null;
            }
        } else {
            return null;
        }
    },
    methods: {
        updateEmployee: function() {
            this.$store.dispatch('users/update', this.user);
        }
    },
    template: `
        <div class="page page--employee-update">
            <h1>
                New Employee
            </h1>
            <employee-detail v-bind:user="user"></employee-detail>
            <button v-on:click="updateEmployee()">Update employee</button>
        </div>
    `
});

export {employeeUpdateComponent}

