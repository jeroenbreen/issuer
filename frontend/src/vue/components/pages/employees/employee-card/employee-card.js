import Vue from 'vue';



const employeeCardComponent = Vue.component('employee-card', {
    methods: {
        deleteItem: function() {
            this.$store.dispatch('users/delete', this.user);
        },
        update: function() {
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
                <div class="icon-button icon-button--inverse" v-on:click="update()">
                    <div class="icon-button__icon">
                        <i class="fas fa-pencil-alt"></i>
                    </div>
                    <div class="icon-button__label">
                        Update
                    </div>
                </div>
                <div class="icon-button icon-button--inverse" v-on:click="deleteItem()">
                    <div class="icon-button__icon">
                        <i class="fas fa-trash"></i>
                    </div>
                    <div class="icon-button__label">
                        Remove
                    </div>
                </div>
            </div>
        </div>
    `
});

export {employeeCardComponent}
