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
            <li>
                <router-link to="/">Documents</router-link>
            </li>
            <!--<li>-->
            <!--<router-link to="/">Todo's</router-link>-->
            <!--</li>-->
        </ul>

        <ul class="menu__index">
            <li>
                <router-link to="/issues">
                    Issues
                    <avatar
                        v-bind:user="getCurrentUser()"
                        v-bind:size="24"/>
                </router-link>
            </li>
        </ul>
    </div>
</template>


<style lang="less">
    // todo move these
    @general-border: 1px solid #ddd;
    @general-padding: 10px;
    @menu-width: 200px;
    @topbar-height: 68px;

    // colors
    @grey-10: #ddd;
    @grey-20: #aaa;

    @blue: #00B7FF;
    @blue-dark: #176C82;
    @editing-mode-color: #FFE000;
    @editing-mode-color-light: #FCF3C0;
    @editing-mode-color-dark: #8E7A04;
    @editing-mode-color-hover: #FFEF7B;
    @editing-mode-color-contra: #000;

    //theme
    @main-theme-font-2: Tinos;
    @main-theme-color: #E25252;


    .menu {

        .menu__index {
            padding: 0;
            margin: 0;
            border-bottom: 4px solid @grey-10;

            li {
                list-style: none;

                a {
                    display: flex;
                    align-items: center;
                    padding: @general-padding;
                    border-bottom: @general-border;
                    text-decoration: none;
                    color: #000;

                    .avatar {
                        margin-left: 8px;
                    }


                    &:hover,
                    &.router-link-exact-active {
                        background: @grey-10;
                    }
                }
            }
        }
    }
</style>