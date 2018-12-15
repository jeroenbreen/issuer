<script>
    import crudMixin from '@mixins/crud-mixin';
    import employeeDetails from './employee-details';
    import {User} from '@models/User';

    export default {
        name: 'employee-update',
        components: {
            employeeDetails
        },
        mixins: [crudMixin],
        data() {
            const getItemById = this.$store.getters['users/getItemById'];
            let id, user;
            id = this.$route.params.id;
            if (id) {
                user = getItemById(id);
                if (user) {
                    return {
                        user: new User(user.toBackend())
                    }
                } else {
                    return null;
                }
            } else {
                return null;
            }
        },
        methods: {
            deleteItem: function() {
                this.$_crudMixin_delete(this.user, 'users', 'employees');
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
                <md-tooltip md-delay="300" md-direction="bottom">Back to employees</md-tooltip>
            </div>
            <h1>
                {{user.getFullName()}}
            </h1>
        </div>

        <employee-details
            :user="user"
            :auto-save="true"/>

        <div class="view-frame-section">
            <md-button @click="deleteItem()" class="md-primary">Remove Employee</md-button>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';
</style>

