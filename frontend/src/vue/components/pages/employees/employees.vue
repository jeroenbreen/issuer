<script>
    import employeeCard from './employee-card';

    export default {
        name: 'employees',
        components: {
            employeeCard
        },
        methods: {
            getAll: function(){
                return this.$store.state.users.all;
            },
            getCurrent: function() {
                return this.$store.state.users.currentUser;
            },
            create: function() {
                this.$router.push('employees/new');
            }
        }
    }

</script>


<template>
    <div class="view-frame view-frame--employees" v-scrim>
        <div class="view-frame-section">
            <h1>
                Employees
            </h1>
        </div>
        <div class="view-frame-section">
            <md-button @click="create()" class="md-primary">Create Employee</md-button>
        </div>
        <div class="view-frame-section">
            <div class="employee-cards">
                <employee-card
                    v-for="user in getAll()"
                    :key="user._id"
                    :user="user"/>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .employee-cards {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 20px;
    }
</style>