<script>
    import crudMixin from '@mixins/crud-mixin';
    import employeeDetails from './employee-details';
    import {User} from '@models/User';

    export default {
        name: 'employee-create',
        components: {
            employeeDetails
        },
        mixins: [crudMixin],
        data() {
            return {
                user: new User()
            }
        },
        methods: {
            create: function() {
                this.$_crudMixin_create(this.user, 'users', 'employees').then((frame) => {
                    // todo create module that can put the frame into an undo action inside
                    // a snackbar
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
                @click="back()"
                class="view-frame__header-button">
                <i class="fas fa-arrow-left"></i>
                <md-tooltip md-delay="300" md-direction="bottom">Back to employees</md-tooltip>
            </div>
            <h1>
                New Employee
            </h1>
        </div>
        <employee-details :user="user"/>

        <div class="view-frame-section">
            <md-button @click="create()" class="md-primary">Create Employee</md-button>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';
</style>

