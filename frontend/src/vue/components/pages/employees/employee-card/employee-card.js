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
        <div class="employee">
            <div class="employee-card">
                <avatar 
                    v-bind:user="user"
                    v-bind:size="96"></avatar>
                <div class="employee-card__name">
                    {{user.getFullName()}}
                </div>
            </div>
           

            <div class="employee-card__toolbar">
                <div class="icon-button" v-on:click="update()">
                    <div class="icon-button__icon">
                        <i class="fas fa-pencil-alt"></i>
                    </div>
                </div>
                <div class="icon-button" v-on:click="deleteItem()">
                    <div class="icon-button__icon">
                        <i class="fas fa-trash"></i>
                    </div>
                </div>
            </div>
        </div>
    `
});

export {employeeCardComponent}

