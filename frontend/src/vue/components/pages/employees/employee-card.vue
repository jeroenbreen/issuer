<script>
    import avatar from '@components/shared/avatar';
    import {User} from '@models/User';

    export default {
        props: {
            user: {
                type: User,
                required: true
            }
        },
        components: {
            avatar
        },
        methods: {
            goToUpdate: function() {
                this.$router.push('employees/' + this.user._id)
            }
        }
    }
</script>


<template>
    <div
        @click="goToUpdate()"
        class="employee-card">
        <avatar
            :user="user"
            :size="96"/>
        <div class="employee-card__name">
            {{user.getFullName()}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .employee-card {
        width: 180px;
        margin: 0 16px 16px 0;
        text-align: center;
        position: relative;
        background: #fff;
        box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 5px 8px 0 rgba(0,0,0,.14), 0 1px 14px 0 rgba(0,0,0,.12);
        padding: 20px 10px;
        height: 180px;
        cursor: pointer;

        &:hover {
            background: $grey-10;
        }

        .avatar {
            background-color: #fff;
        }

        .employee-card__name {
            height: 20px;
            margin-top: 10px;
            line-height: 1;
            text-align: center;
        }
    }
</style>