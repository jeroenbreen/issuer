<script>
    export default {
        name: 'item-border',
        props: ['item']
    }
</script>


<template>
    <div
        :style="{'background': item.color}"
        class="item__border"></div>
</template>


<style lang="scss">
    .item__content {

        img {
            width: 100%;
        }
    }
</style>