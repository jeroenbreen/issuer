import Vue from 'vue';
import {employeeDetailsComponent} from './../employee-details/employee-details';
import {User} from './../../../../store/models/User';


const employeeUpdateComponent = Vue.component('new-employee', {
    data() {
        const getItemById = this.$store.getters['users/getItemById'];
        let id, user;
        id = this.$route.params.id;
        if (id) {
            user = getItemById(id);
            if (user) {
                return {
                    currentUser: user,
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
        update: function() {
            this.$store.dispatch('users/update', this.user).then(() => {
                this.$router.push({path: '/employees'});
            });
        },
        back: function() {
            this.$router.push('/employees');
        }
    },
    template: `
        <div class="page page--employee-update">
            <h1>
                {{currentUser.getFullName()}}
            </h1>
            <employee-detail v-bind:user="user"></employee-detail>
            
            <div class="iss-button" v-on:click="update()">
                Update Employee
            </div>
            <div class="iss-button" v-on:click="back()">
                Back
            </div>
        </div>
    `
});

export {employeeUpdateComponent}

