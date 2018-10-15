import Vue from 'vue';
import {ElementMixin, HandleDirective} from "vue-slicksort";

import {hourlyLineComponent} from "./hourly-line";
import {sumLineComponent} from "./sum-line";
import {subtotalLineComponent} from "./subtotal-line";
import {textLineComponent} from "./text-line";
import {breakLineComponent} from "./break-line";


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
            <div v-if="!line.document.locked" class="line__grip handle" v-handle>
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
                
            <subtotal-line 
                v-if="line.type === 'subtotal'"
                v-bind:line="line"/>
                
            <text-line 
                v-if="line.type === 'text'"
                v-bind:line="line"/>
                
            <break-line 
                v-if="line.type === 'break'"
                v-bind:line="line"/>
            
            
            <div class="line__tools" v-if="!line.document.locked">
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

