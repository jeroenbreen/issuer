import Vue from 'vue';
import {ElementMixin} from "vue-slicksort";
import $ from "jquery";




const miniPageComponent = Vue.component('mini-page', {
    mixins: [ElementMixin],
    props: ['page'],
    template: `
        <li class="mini-page"></li>
    `
});

export {miniPageComponent}

