<script>
    import vueDragResize from '@components/shared/vue-drag-resize/vue-drag-resize'
    import itemBorder from './item--border';
    import itemText from './item--text';
    import itemImage from './item--image';



    export default {
        name: 'item-draggable',
        components: {
            vueDragResize, itemBorder, itemText, itemImage
        },
        props: ['template', 'editor', 'factor', 'item', 'onClick', 'page', 'documentPropertyHandler'],
        methods: {
            onDrag (event) {
                if (this.editor) {
                    this.item.x = event.left;
                    this.item.y = event.top;
                }
            },
            onResize (event) {
                if (this.editor) {
                    this.item.x = event.left;
                    this.item.y = event.top;
                    this.item.width = event.width;
                    this.item.height = event.height;
                }
            },
            scale(value) {
                return value * this.factor;
            },
            select() {
                this.onClick(this.item);
            },
            isActive() {
                return this.$store.state.templateEditor.currentItemIndex === this.template.items.indexOf(this.item);
            }
        }
    }
</script>


<template>
    <vue-drag-resize
            @clicked="select()"
            dragHandle=".drag-handle"
            container=".document__elements"
            :preventActiveBehavior="!editor && item.type !== 'total'"
            :parentLimitation="true"
            :minw="1"
            :minh="1"
            :w="scale(item.width)"
            :h="scale(item.height)"
            :x="scale(item.x)"
            :y="scale(item.y)"
            :is-active="isActive()"
            @resizing="onResize"
            @dragging="onDrag">

        <div class="drag-handle">
            <div class="drag-handle__bar"></div>
            <div class="drag-handle__bar"></div>
            <div class="drag-handle__bar"></div>
        </div>


        <div class="item__content" :style="{'padding': scale(item.padding) + 'px', 'background': item.background}">

            <item-border
                v-if="item.type === 'border'"
                :item="item"/>

            <item-image
                v-if="item.type === 'image'"
                :item="item"
                :editor="editor"
                :template="template"/>

            <item-text
                v-if="item.type === 'text'"
                :item="item"
                :document-property-handler="documentPropertyHandler"
                :editor="editor"/>

        </div>
    </vue-drag-resize>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .vdr {

        .drag-handle {
            position: absolute;
            left: 0;
            top: -30px;
            width: 30px;
            height: 30px;
            cursor: move;
            background: $editing-mode-color;
            display: none;
            padding: 10px 8px;

            .drag-handle__bar {
                height: 2px;
                margin-bottom: 2px;
                background: #fff;
                pointer-events: none;
            }
        }

        &.active {

            .drag-handle {
                display: block;
            }
        }

        .item__content {
            height: 100%;
        }
    }
</style>