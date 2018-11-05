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
        <div class="view-frame view-frame--employee-create">
            <div class="view-frame-section">
                <h1>
                    New Employee
                </h1>
            </div>
            <employee-detail v-bind:user="user"></employee-detail>
            
            <div class="view-frame-section">
                <md-button v-on:click="create()" class="md-primary">Create Employee</md-button>
                
                <md-button v-on:click="back()" class="md-primary">Back</md-button>
            </div>
        </div>
    `
});

export {employeeCreateComponent}

