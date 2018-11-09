import Vue from 'vue';
import {imageUploaderComponent} from './../../../pages/templates/image-uploader/image-uploader';
import $ from 'jquery';

const itemComponent = Vue.component('item', {
    props: ['template', 'editor', 'factor', 'item'],
    methods: {
        onDrag (x, y) {
            this.item.x = x;
            this.item.y = y;
        },
        onResize (x, y, width, height) {
            if (this.editor) {
                this.item.width = width;
                this.item.height = height;
                //$(this.$el).css('left', this.scale(this.item.getX(this.template)))
            }
        },
        scale(value) {
            return value * this.factor;
        },
    },
    template: `
        <vue-draggable-resizable
            class="iss-resizable"
            v-on:dragging="onDrag"
            v-on:resizing="onResize"
            v-bind:axis="item.getAxis()"
            v-bind:draggable="item.isDraggable()"
            v-bind:resizable="editor"
            v-bind:minw="20"
            v-bind:w="scale(item.width)"
            v-bind:minh="20"
            v-bind:h="scale(item.height)"
            v-bind:x="scale(item.getX(template))"
            v-bind:y="scale(item.y)"
            v-bind:parent="true">
            <image-uploader
                v-if="editor && item.type === 'image'"
                v-bind:item="item"
                v-bind:template="template"></image-uploader>
            
            <img v-if="item.type === 'image'" v-bind:src="item.getSrc()">
        </vue-draggable-resizable>
    `
});

export {itemComponent}

