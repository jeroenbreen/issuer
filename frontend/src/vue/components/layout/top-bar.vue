<script>
    import logo from './logo';

    export default {
        name: 'top-bar',
        props: ['model'],
        components: {
            logo
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
        <logo/>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .topbar {
        background: #fff;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);

        .avatar {
            position: absolute;
            right: 10px;
            top: 10px;
        }
    }
</style>

