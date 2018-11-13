<script>
    import avatar from '@components/shared/avatar/avatar';

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
        <avatar v-bind:user="user"></avatar>
        {{user.getFullName()}}
    </div>
</template>


<style lang="less">
    .user {
        padding: 12px;
        border-top: @general-border;
        display: flex;
        align-items: center;
        cursor: pointer;

        &:hover,
        &.user--current {
            background: @grey-10;
        }
    }
</style>
