<script>
    export default {
        name: 'avatar',
        props: ['user', 'size'],
    }
</script>


<template>
    <div class="avatar" :style="{ 'background-image': 'url(' + user.thumbnail + ')', 'width': size + 'px', 'height': size + 'px' }"></div>
</template>


<style lang="scss">      @import '@styles/variables.scss';
    .avatar {
        width: 48px;
        height: 48px;
        display: inline-block;
        border: $generalBorder;
        border-radius: 50%;
        background-position: 50% 50%;
        background-size: cover;
    }
</style>
