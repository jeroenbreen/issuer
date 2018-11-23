<script>
    import textAlign from './template-tools/text-align';
    import itemAppearance from './template-tools/item-appearance';
    import colorPicker from './template-tools/color-picker';
    import itemText from './template-tools/item-text';
    import itemPadding from './template-tools/item-padding';
    import itemDimensions from './template-tools/item-dimensions';
    import itemPositioning from './template-tools/item-positioning';

    export default {
        name: 'template-item-tools',
        props: ['item', 'template', 'currentPage'],
        components: {
            textAlign, itemAppearance, colorPicker, itemText, itemPadding, itemDimensions, itemPositioning
        },
        methods: {
            removeItem() {
                const template = this.template;
                const item = this.item;
                const store = this.$store;

                function callback() {
                    template.removeItem(item);
                    store.commit('templateEditor/unsetCurrentItemIndex');
                }

                this.$store.commit('confirm', {
                    message: 'Are you sure?',
                    callback: callback
                });
            }
        }
    }
</script>


<template>
    <div class="template-item-tools tool-box">
        <div class="tool-box__header">
            Item ({{item.type}})
        </div>
        <div
            v-if="!item.required"
            class="tool-box__section">
            <div class="tool-box__label">&nbsp;</div>
            <button @click="removeItem()">
                Remove Item
            </button>
        </div>

        <item-appearance
            v-if="!item.required"
            :item="item"/>

        <item-text
            v-if="item.type === 'total' || item.type === 'text'"
            :item="item"/>

        <item-dimensions
            v-if="item.draggable"
            :item="item"/>

        <color-picker
            v-if="item.styleable"
            :item="item"/>

        <item-positioning
            v-if="item.draggable"
            :item="item"
            :template="template"/>

        <text-align
            v-if="item.type === 'text'"
            :item="item"/>

        <item-padding
            v-if="item.styleable"
            :item="item"/>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';
</style>