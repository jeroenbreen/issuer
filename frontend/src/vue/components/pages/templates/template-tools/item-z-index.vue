<script>
    export default {
        name: 'item-z-index',
        props: ['item', 'template'],
        methods: {
            placeOnTop() {
                let index = this.template.items.indexOf(this.item);
                this.template.items.push(this.template.items.splice(index, 1)[0]);
            }
        }
    }
</script>


<template>
    <div class="tool-box__section">
        <div class="tool-box__label">&nbsp;</div>
        <button @click="placeOnTop()">
            Place on top
        </button>
    </div>
</template>


<style lang="scss">

</style>