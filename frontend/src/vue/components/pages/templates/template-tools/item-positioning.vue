<script>
    export default {
        name: 'item-positioning',
        props: ['item', 'template'],
        methods: {
            centerHorizontal() {
                this.item.x = (this.template.getElementAreaWidth() - this.item.width) / 2;
            }
        }
    }
</script>


<template>
    <div class="template-tools__section">
        <div class="template-tools__row">
            <div class="template-tools__label">
                Horiz. centered
            </div>
            <div @click="centerHorizontal()" class="template__tool">
                <i class="fas fa-arrows-alt-h"></i>
            </div>
        </div>
    </div>
</template>


<style lang="scss">

</style>