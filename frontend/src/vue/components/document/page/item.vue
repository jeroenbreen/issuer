<script>
    import vueDragResize from '@components/shared/vue-drag-resize/vue-drag-resize'
    import imageUploader from '@components/pages/templates/image-uploader';
    import contentParser from './content-parser'
    import $ from 'jquery';

    export default {
        name: 'item',
        components: {
            vueDragResize, imageUploader
        },
        props: ['template', 'editor', 'factor', 'item', 'onClick', 'document', 'page'],
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
            getContent() {
                let company = this.$store.state.company;
                let document = this.document;
                let page = this.page;
                let documentIdFormatter = this.$root.$options.filters.documentIdFormatter;
                let documentIdFormat = this.$store.state.settings.documentIdFormat;
                let dateFormatter = this.$root.$options.filters.dateFormatter;
                return contentParser.parse(this.item.content, company, document, page, documentIdFormatter, documentIdFormat, dateFormatter);
            },
            select() {
                this.onClick(this.item);
                if ((this.item.type === 'text' || this.item.type === 'tag-text') && this.editor) {
                    //$(this.$el).find('textarea').focus();
                }
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
        :preventActiveBehavior="!editor"
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

        <div
            :style="{'padding': scale(item.padding) + 'px',
                     'background': item.background}"
            class="item__content">

            <div
                v-if="item.type === 'border'"
                :style="{'background': item.color}"
                class="item__border"></div>

            <img
                    v-if="item.type === 'image'"
                    :src="item.getSrc()">

            <textarea
                    v-if="item.type === 'text' && editor"
                    v-model="item.content"
                    :style="{'text-align': item.textAlign}"></textarea>

            <div
                    class="item__text"
                    v-if="item.type === 'text' && !editor"
                    v-html="getContent()"
                    :style="{'text-align': item.textAlign}"></div>
        </div>

        <image-uploader
                v-if="editor && item.type === 'image'"
                :item="item"
                :template="template"/>


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

            .item__border {
                height: 100%;
            }

            img {
                width: 100%;
            }

            .item__text,
            textarea {
                width: 100%;
                height: 100%;
                border: 0;
                background: transparent;
                padding: 0;
                margin: 0;
                resize: none;
                font-family: inherit;
                font-size: inherit;
                outline: none;
            }
        }
    }
</style>