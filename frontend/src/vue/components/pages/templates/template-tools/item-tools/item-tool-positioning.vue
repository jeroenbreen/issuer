<script>
    export default {
        name: 'item-tool-positioning',
        props: ['item', 'template'],
        methods: {
            centerHorizontal() {
                this.item.x = (this.template.getElementAreaWidth() - this.item.width) / 2;
            }
        }
    }
</script>


<template>
    <div class="tool-box__section">
        <div class="tool-box__row">
            <div class="tool-button" @click="centerHorizontal()">
                <div class="tool-button__icon">
                    <i class="fas fa-arrows-alt-h"></i>
                </div>
                <div class="tool-button__label">
                    Place in center
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">

</style>