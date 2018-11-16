<script>
    import textAlign from './template-tools/text-align';
    import itemAppearance from './template-tools/item-appearance';
    import colorPicker from './template-tools/color-picker';
    import itemText from './template-tools/item-text';
    import itemPadding from './template-tools/item-padding';
    import itemDimensions from './template-tools/item-dimensions';
    import itemPositioning from './template-tools/item-positioning';

    export default {
        props: ['item', 'template'],
        components: {
            textAlign, itemAppearance, colorPicker, itemText, itemPadding, itemDimensions, itemPositioning
        },
        methods: {
            addImage() {
                let image = {
                    src: 'image-placeholder.png',
                    width: 100,
                    height: 100,
                    x: (this.template.getElementAreaWidth() - 100) / 2,
                    y: 100
                };
                this.template.addItem('image', image, 'frontPage');
            },
            addText() {
                let text = {
                    content: '',
                    width: 200,
                    height: 20,
                    x: (this.template.getElementAreaWidth() - 200) / 2,
                    y: 100
                };
                this.template.addItem('text', text, 'frontPage');
            },
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
    <div class="template-tools">
        <div class="template-tools__section">
            <div class="template-tools__label">&nbsp;</div>
            <button @click="addImage()">
                Add Image
            </button>
            <button @click="addText()">
                Add Text
            </button>
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

    .template-tools {
        position: fixed;
        right: 80px;
        top: 40px;
        height: calc(100% - 40px);
        overflow: auto;
        width: 260px;

        .template-tools__set {
            display: flex;
        }

        .template__tool {
            background: #ddd;
            border: 1px solid transparent;
            border-radius: 2px;
            width: 24px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 24px;
            cursor: pointer;
            font-size: 14px;
            margin-right: 2px;

            &:hover {
                border: 1px solid #000;
            }

            &.template__tool--current {
                border: 1px solid #000;
            }
        }
    }

    .template-tools__section {
        padding: 20px;
        border-bottom: 1px solid #ddd;
        background: #fff;

        .template-tools__header {
            font-weight: 700;
            font-size: 15px;
            margin-bottom: 6px;
        }

        .template-tools__row {
            display: flex;
            margin-bottom: 4px;
            align-items: center;

            .template-tools__label {
                width: 100px;
                color: #000;
                text-align: right;
                padding: 3px 10px 0 0;
            }

            .md-field {
                width: 100px;
                padding: 0;
                margin: 0;
                min-height: 0;

                input {
                    width: 100%;
                    height: 26px;
                    border: 0;
                    background: #ddd;
                    color: #000;
                    padding: 4px;
                    margin: 0;
                    font-size: 12px;
                }
            }
        }
    }
</style>