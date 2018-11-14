<script>
    import employeeDetails from './employee-details';
    import {User} from '@models/User';

    export default {
        name: 'employee-create',
        components: {
            employeeDetails
        },
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
        }
    }

</script>


<template>
    <div class="view-frame view-frame--employee-create" v-scrim>
        <div class="view-frame__header">
            <div
                v-on:click="back()"
                class="view-frame__header-button">
                <i class="fas fa-arrow-left"></i>
            </div>
            <h1>
                New Employee
            </h1>
        </div>
        <employee-details v-bind:user="user"></employee-details>

        <div class="view-frame-section">
            <md-button v-on:click="create()" class="md-primary">Create Employee</md-button>
        </div>
    </div>
</template>


<style lang="scss">      @import '@styles/variables.scss';</style>

