<script>
    import avatar from '@components/shared/avatar';

    export default {
        name: 'user',
        components: {
            avatar
        },
        props: ['user']
    }

</script>


<template>
    <div class="user">
        <avatar :user="user"></avatar>
        {{user.getFullName()}}
    </div>
</template>


<style lang="scss">      @import '@styles/variables.scss';


    .user {
        padding: 12px;
        border-top: $generalBorder;
        display: flex;
        align-items: center;
        cursor: pointer;

        &:hover,
        &.user--current {
            background: $grey-10;
        }
    }
</style>
