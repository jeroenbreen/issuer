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

                function callback() {
                    template.removeItem(item);
                }

                this.$store.commit('confirm', {
                    message: 'Are you sure?',
                    callback: callback
                });
            },

        }
    }
</script>


<template>
    <div class="template-item-tools template-tools">
        <div class="template-tools__header">
            Item ({{item.type}})
        </div>
        <div
            v-if="item && item.type !== 'box'"
            class="template-tools__section">
            <div class="template-tools__label">&nbsp;</div>
            <button @click="removeItem()">
                Remove Item
            </button>
        </div>

        <item-appearance
            v-if="item && item.type !== 'box'"
            :item="item"/>

        <item-text
            v-if="item && item.type === 'text'"
            :item="item"/>

        <item-dimensions
            v-if="item"
            :item="item"/>

        <color-picker
            v-if="item && item.type !== 'box'"
            :item="item"/>

        <item-positioning
            v-if="item && item.type !== 'box'"
            :item="item"
            :template="template"/>

        <text-align
            v-if="item && item.type === 'text'"
            :item="item"/>

        <item-padding
            v-if="item && item.type !== 'box'"
            :item="item"/>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';
</style>