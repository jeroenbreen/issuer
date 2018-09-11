import Vue from 'vue';


const employeeCardComponent = Vue.component('employee-card', {
    methods: {
        deleteUser: function() {
            this.$store.dispatch('users/delete', this.user);
        },
        updateUser: function() {
            this.$router.push('employees/' + this.user._id)
        }
    },
    props: ['user'],
    template: `
        <div class="employee-card">
            <avatar v-bind:user="user"></avatar>
            <div class="employee-card__name">
                {{user.getFullName()}}
            </div>
            <div class="employee-card__toolbar">
                <button v-on:click="updateUser()">Update</button>
                <button v-on:click="deleteUser()">Remove</button>
            </div>
        </div>
    `
});

export {employeeCardComponent}

