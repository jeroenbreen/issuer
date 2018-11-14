<script>
    import user from '@components/shared/user';

    export default {
        name: 'welcome-screen',
        components: {
            user
        },
        methods: {
            setCurrent: function(user) {
                this.$store.commit('users/setCurrent', user);
            },
            // todo user getters
            getUsers: function() {
                return this.$store.state.users.all;
            },
            getCurrentUser: function() {
                return this.$store.state.users.currentUser;
            },
            getGreeting: function() {
                let date = new Date(),
                    curHr = date.getHours();
                if (curHr < 12) {
                    return 'Good morning';
                } else if (curHr < 18) {
                    return 'Good afternoon';
                } else {
                    return 'Good evening';
                }

            }
        }
    }
</script>


<template>
    <div class="welcome-screen">
        <h3>{{getGreeting()}}</h3>
        <user
            v-for="user in getUsers()"
            @click.native="setCurrent(user)"
            :key="user.id"
            :user="user"
            :class="{'user--current': (user === getCurrentUser())}"/>
    </div>
</template>


<style lang="scss">      @import '@styles/variables.scss';
    .welcome-screen {
        width: 300px;
        background: #fff;
        box-shadow: 0 0 24px rgba(0,0,0,0.2);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        h3 {
            text-align: center;
            margin: 20px;
        }
    }
</style>