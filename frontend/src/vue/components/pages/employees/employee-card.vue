<script>
    import avatar from '@components/shared/avatar';

    export default {
        props: ['user'],
        components: {
            avatar
        },
        methods: {
            deleteItem: function() {
                const store = this.$store;
                const user = this.user;

                function callback() {
                    store.dispatch('users/delete', user);
                }

                this.$store.commit('confirm', {
                    message: 'Are you sure?',
                    callback: callback
                });
            },
            update: function() {
                this.$router.push('employees/' + this.user._id)
            }
        }
    }
</script>


<template>
    <div class="employee">
        <div class="employee-card">
            <avatar
                    :user="user"
                    :size="96"></avatar>
            <div class="employee-card__name">
                {{user.getFullName()}}
            </div>
        </div>


        <div class="employee-card__toolbar">
            <div class="icon-button" @click="update()">
                <div class="icon-button__icon">
                    <i class="fas fa-pencil-alt"></i>
                </div>
            </div>
            <div class="icon-button" @click="deleteItem()">
                <div class="icon-button__icon">
                    <i class="fas fa-trash"></i>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .employee {

        width: 180px;
        height: 200px;
        margin: 0 16px 16px 0;
        text-align: center;
        position: relative;

        .employee-card {
            background: #fff;
            box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 5px 8px 0 rgba(0,0,0,.14), 0 1px 14px 0 rgba(0,0,0,.12);
            padding: 20px 10px;
            height: 180px;

            .employee-card__name {
                height: 20px;
                margin-top: 10px;
                line-height: 1;
                text-align: center;
            }
        }

        .employee-card__toolbar {
            margin-top: 16px;
            display: flex;
            justify-content: center;
        }
    }
</style>