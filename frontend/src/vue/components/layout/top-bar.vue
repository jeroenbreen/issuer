<script>
    import avatar from '@components/shared/avatar';

    export default {
        name: 'top-bar',
        props: ['model'],
        components: {
            avatar
        },
        methods: {
            getCurrentUser() {
                return this.$store.state.users.current;
            }
        }
    }
</script>


<template>
    <div class="topbar">
        Welcome
        <avatar
            v-if="getCurrentUser()"
            :user="getCurrentUser()"
            :size="48"/>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .topbar {

        .avatar {
            position: absolute;
            right: 10px;
            top: 10px;
        }
    }
</style>

