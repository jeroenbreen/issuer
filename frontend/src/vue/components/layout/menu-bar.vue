<script>
    import avatar from '@components/shared/avatar';

    export default {
        name: 'menu-bar',
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
    <div class="menu">
        <ul class="menu__index">
            <li>
                <router-link to="/company">Company</router-link>
            </li>
            <li>
                <router-link to="/employees">Employees</router-link>
            </li>
            <li>
                <router-link to="/settings">Settings</router-link>
            </li>
            <li>
                <router-link to="/templates">Templates</router-link>
            </li>
        </ul>

        <ul class="menu__index">
            <li>
                <router-link to="/clients">Clients</router-link>
            </li>
            <li>
                <router-link to="/projects">Projects</router-link>
            </li>
        </ul>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';



    .menu {

        .menu__index {
            padding: 0;
            margin: 0;
            border-bottom: 4px solid $grey-10;

            li {
                list-style: none;

                a {
                    display: flex;
                    align-items: center;
                    padding: $general-padding;
                    border-bottom: $generalBorder;
                    text-decoration: none;
                    color: #000;
                    transition: none;

                    .avatar {
                        margin-left: 8px;
                    }


                    &:hover,
                    &.router-link-exact-active {
                        background: $grey-10;
                        color: #000;
                    }
                }
            }
        }
    }
</style>