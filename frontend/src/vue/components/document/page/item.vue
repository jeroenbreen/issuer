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
            v-bind:parentLimitation="true"
            v-bind:minw="20"
            v-bind:minh="20"
            v-bind:w="scale(item.width)"
            v-bind:h="scale(item.height)"
            v-bind:x="scale(item.x)"
            v-bind:y="scale(item.y)"
            v-on:resizing="onResize"
            v-on:dragging="onDrag">
        <image-uploader
                v-if="editor && item.type === 'image'"
                v-bind:item="item"
                v-bind:template="template"/>

        <img v-if="item.type === 'image'" v-bind:src="item.getSrc()">
    </vue-drag-resize>
</template>


<style lang="scss">      @import '@styles/variables.scss';
    .vdr {

        img {
            width: 100%;
        }
    }
</style>