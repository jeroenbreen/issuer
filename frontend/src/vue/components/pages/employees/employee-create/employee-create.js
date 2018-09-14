import Vue from 'vue';
import {employeeDetailsComponent} from './../employee-details/employee-details';
import {User} from './../../../../store/models/User';


const employeeCreateComponent = Vue.component('employee-create', {
    data() {
        return {
            user: new User()
        }
    },
    methods: {
        create: function() {
            this.$store.dispatch('users/create', this.user).then(() => {
                this.$router.push({path: '/employees'});
            });
        },
        back: function() {
            this.$router.push('/employees');
        }
    },
    template: `
        <div class="page page--employee-create">
            <h1>
                New Employee
            </h1>
            <employee-detail v-bind:user="user"></employee-detail>
            
            <div class="iss-button" v-on:click="create()">
                Create Employee
            </div>
            <div class="iss-button" v-on:click="back()">
                Back
            </div>
        </div>
    `
});

export {employeeCreateComponent}

