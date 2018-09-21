import Vue from 'vue';
import {ElementMixin} from "vue-slicksort";

const lineComponent = Vue.component('doc-line', {
    mixins: [ElementMixin],
    methods: {

    },
    props: ['line'],
    template: `
        <div class="line">
            <div class="line__grip">
                <div class="grip__bar"></div>
                <div class="grip__bar"></div>
                <div class="grip__bar"></div>
                <div class="grip__bar"></div>
            </div>
            <div class="line__subject">
                <input v-model="line.subject">
            </div>
            <div class="line__hours">
                <input v-model.number="line.hours">
            </div>
            <div class="line__multiply">
                ×
            </div>
            <div class="line__rate">
                <input v-model.number="line.rate">
            </div>
            <div class="line__value">
                {{line.getValue()}} EUR
            </div>
        </div>
    `
});

export {lineComponent}

