import Vue from 'vue';
import {switchInputComponent} from '../../../shared/switch-input/switch-input'


const hourlyLineComponent = Vue.component('hourly-line', {
    methods: {},
    props: ['line', 'editable'],
    template: `
        <div class="line__row">
            <div class="line-part line-part--50 line-part--start">
                <switch-input 
                    v-bind:value="'subject'"
                    v-bind:line="line"
                    v-bind:editbale="editable"></switch-input>
            </div>
            <div class="line-part line-part--25 line-part--middle line-part__set">
                <switch-input 
                        v-bind:value="'hours'"
                        v-bind:line="line"
                        v-bind:size="'number'"
                        v-bind:editbale="editable"></switch-input>
                                    ×
                <switch-input 
                        v-bind:value="'rate'"
                        v-bind:line="line"
                        v-bind:size="'number'"
                        v-bind:editbale="editable"></switch-input>
                {{line.document.currency}}
            </div>
            <div class="line-part line-part--end line-part--25">
                {{line.getValue() | currency}} {{line.document.currency}}
            </div>
        </div>
        
    `
});

export {hourlyLineComponent}

