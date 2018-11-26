<script>
    import itemToolTextAlign from './item-tools/item-tool-text-align';
    import itemToolAppearance from './item-tools/item-tool-appearance';
    import itemToolBackground from './item-tools/item-tool-background';
    import itemToolText from './item-tools/item-tool-text';
    import itemToolPadding from './item-tools/item-tool-padding';
    import itemToolDimensions from './item-tools/item-tool-dimensions';
    import itemToolPositioning from './item-tools/item-tool-positioning';
    import itemTotalContent from './item-tools/item-total-content';
    import itemToolZIndex from './item-tools/item-tool-z-index';

    import {Template} from '@models/Template';
    import {Page} from '@models/document/Page';
    import {_Item} from '@models/template/_Item';

    export default {
        name: 'template-item-tools',
        props: {
            item: {
                type: _Item,
                required: true
            },
            template: {
                type: Template,
                required: true
            },
            currentPage: {
                type: Page,
                required: true
            }
        },
        components: {
            itemToolTextAlign, itemToolAppearance, itemToolBackground, itemToolText, itemToolPadding, itemToolDimensions, itemToolPositioning, itemTotalContent, itemToolZIndex
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

            <div class="tool-button" @click="removeItem()">
                <div class="tool-button__icon">
                    <i class="fas fa-trash"></i>
                </div>
                <div class="tool-button__label">
                    Remove item
                </div>
            </div>
        </div>

        <item-tool-appearance
            v-if="!item.required"
            :item="item"/>

        <item-tool-z-index
            :item="item"
            :template="template"/>

        <item-tool-text
            v-if="item.type === 'text'"
            :item="item"/>

        <item-tool-dimensions
            v-if="item.draggable"
            :item="item"/>

        <item-tool-background
            v-if="item.styleable"
            :item="item"/>

        <item-tool-positioning
            v-if="item.draggable"
            :item="item"
            :template="template"/>

        <item-tool-text-align
            v-if="item.type === 'text'"
            :item="item"/>

        <item-tool-padding
            v-if="item.styleable"
            :item="item"/>

        <item-total-content
            v-if="item.type === 'total'"
            :item="item"/>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';
</style>