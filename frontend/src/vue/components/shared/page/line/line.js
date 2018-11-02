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
        },
        isEditable() {
            return !this.line.document.locked && this.tools;
        }
    },
    props: ['line', 'tools', 'scale'],
    template: `
        <li 
            v-bind:style="{'height': scale(20) + 'px', 'min-height': scale(20) + 'px', 'margin-bottom': scale(4) + 'px'}"
            v-bind:class="{'line--text': line.type === 'text'}"
            class="line">
            <div v-if="isEditable()" class="line__grip handle" v-handle>
                <div class="grip__bar"></div>
                <div class="grip__bar"></div>
                <div class="grip__bar"></div>
                <div class="grip__bar"></div>
            </div>
            
            <hourly-line 
                    v-if="line.type === 'hourly'"
                    v-bind:line="line"
                    v-bind:editable="isEditable()"/>
            <sum-line 
                v-if="line.type === 'sum'"
                v-bind:line="line"
                v-bind:editable="isEditable()"/>
                
            <subtotal-line 
                v-if="line.type === 'subtotal'"
                v-bind:line="line"
                v-bind:editable="isEditable()"/>
                
            <text-line 
                v-if="line.type === 'text'"
                v-bind:line="line"
                v-bind:editable="isEditable()"/>
                
            <break-line 
                v-if="line.type === 'break'"
                v-bind:line="line"
                v-bind:editable="isEditable()"/>
            
            
            <div class="line__tools" v-if="isEditable()">
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

