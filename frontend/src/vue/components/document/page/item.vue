<script>
    import VueDraggableResizable from 'vue-draggable-resizable'
    import imageUploader from '@components/templates/image-uploader';

    export default {
        name: 'item',
        components: {
            imageUploader
        },
        props: ['template', 'editor', 'factor', 'item'],
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
            }
        }
    }
</script>


<template>
    <vue-drag-resize
            :parentLimitation="true"
            :minw="20"
            :minh="20"
            :w="scale(item.width)"
            :h="scale(item.height)"
            :x="scale(item.x)"
            :y="scale(item.y)"
            @resizing="onResize"
            @dragging="onDrag">
        <image-uploader
                v-if="editor && item.type === 'image'"
                :item="item"
                :template="template"/>

        <img v-if="item.type === 'image'" :src="item.getSrc()">
    </vue-drag-resize>
</template>


<style lang="scss">      @import '@styles/variables.scss';
    .vdr {

        img {
            width: 100%;
        }
    }
</style>