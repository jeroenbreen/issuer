<script>
    import VueDraggableResizable from 'vue-draggable-resizable'
    import imageUploader from '@components/templates/image-uploader';
    import $ from 'jquery';

    export default {
        name: 'item',
        components: {
            imageUploader
        },
        props: ['template', 'editor', 'factor', 'item', 'onClick', 'document'],
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
                return this.item.getContent(company, this.document);
            },
            select() {
                this.onClick(this.item);
                if ((this.item.type === 'text' || this.item.type === 'tag-text') && this.editor) {
                    $(this.$el).find('textarea').focus();
                }
            }
        }
    }
</script>


<template>
    <vue-drag-resize
        @click.native="select()"
        :parentLimitation="true"
        :minw="20"
        :minh="20"
        :w="scale(item.width)"
        :h="scale(item.height)"
        :x="scale(item.x)"
        :y="scale(item.y)"
        @resizing="onResize"
        @dragging="onDrag">

        <div
            :style="{'padding': scale(item.padding) + 'px',
                     'background': item.background}"
            class="item__content">
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

        .item__content {
            height: 100%;

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