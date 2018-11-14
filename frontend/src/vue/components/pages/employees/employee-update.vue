<script>
    import employeeDetails from './employee-details';
    import {User} from '@models/User';

    export default {
        name: 'employee-update',
        components: {
            employeeDetails
        },
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
        }
    }
</script>


<template>
    <div class="view-frame view-frame--employee-update" v-scrim>
        <div class="view-frame__header">
            <div
                @click="back()"
                class="view-frame__header-button">
                <i class="fas fa-arrow-left"></i>
            </div>
            <h1>
                {{currentUser.getFullName()}}
            </h1>
        </div>

        <employee-details :user="user"/>

        <div class="view-frame-section">
            <md-button @click="update()" class="md-primary">Update Employee</md-button>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';
</style>

