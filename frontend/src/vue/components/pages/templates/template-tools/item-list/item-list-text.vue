<script>
    export default {
        name: 'item-list-text',
        props: ['item']
    }
</script>


<template>
    <div class="item-list-item__container">
        <div class="item-list__icon">
            <span>
                <i class="fas fa-font"></i>
            </span>
        </div>
        <div class="item-list__label">
            {{item.content}}
        </div>
    </div>
</template>


<style lang="scss">

</style>