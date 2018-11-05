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
        <div class="view-frame view-frame--employee-update" v-scrim>
            <div class="view-frame__header">
                <div 
                    v-on:click="back()"
                    class="view-frame__header-button">
                    <i class="fas fa-arrow-left"></i>
                </div>
                <h1>
                    {{currentUser.getFullName()}}
                </h1>
            </div>
            
            <employee-detail v-bind:user="user"></employee-detail>
            
            <div class="view-frame-section">
                <md-button v-on:click="update()" class="md-primary">Update Employee</md-button>
            </div>
        </div>
    `
});

export {employeeUpdateComponent}

