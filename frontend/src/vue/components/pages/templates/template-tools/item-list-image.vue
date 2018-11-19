<script>
    export default {
        name: 'item-list-image',
        props: ['item']
    }
</script>


<template>
    <div class="item-list-item__container">
        <div class="item-list__icon" :style="{'background-image': 'url(' + item.getSrc() + ')'}"></div>
        <div class="item-list__label">
            image
        </div>
    </div>
</template>


<style lang="scss">

</style>