import Vue from 'vue';
import {ElementMixin, HandleDirective} from "vue-slicksort";

import {hourlyLineComponent} from "./hourly-line";
import {sumLineComponent} from "./sum-line";


const lineComponent = Vue.component('doc-line', {
    mixins: [ElementMixin],
    directives: { handle: HandleDirective },
    methods: {
        removeLine() {
            this.line.page.removeLine(this.line);
        }
    },
    props: ['line'],
    template: `
        <li class="line">
            <div class="line__grip handle" v-handle>
                <div class="grip__bar"></div>
                <div class="grip__bar"></div>
                <div class="grip__bar"></div>
                <div class="grip__bar"></div>
            </div>
            
            <hourly-line 
                    v-if="line.type === 'hourly'"
                    v-bind:line="line"/>
            <sum-line 
                v-if="line.type === 'sum'"
                v-bind:line="line"/>
            
            
            <div class="line__tools">
                <div 
                    v-on:click="removeLine()"
                    class="line__tool">
                    <i class="fas fa-times"></i>
                </div>
            </div>
        </li>
    `
});

export {lineComponent}

