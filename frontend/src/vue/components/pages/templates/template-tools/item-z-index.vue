<script>
    export default {
        name: 'item-z-index',
        props: ['item', 'template'],
        methods: {
            placeOnTop() {
                let index = this.template.items.indexOf(this.item);
                this.template.items.push(this.template.items.splice(index, 1)[0]);
                this.$store.commit('templateEditor/setCurrentItemIndex', (this.template.items.length - 1));
            }
        }
    }
</script>


<template>
    <div class="tool-box__section">
        <div class="tool-box__label">&nbsp;</div>
        <div class="tool-button" @click="placeOnTop()">
            <div class="tool-button__icon">
                <i class="fas fa-layer-group"></i>
            </div>
            <div class="tool-button__label">
                Place on top
            </div>
        </div>
    </div>
</template>


<style lang="scss">

</style>