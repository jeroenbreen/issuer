import Vue from 'vue';


const sumLineComponent = Vue.component('sum-line', {
    methods: {},
    props: ['line'],
    template: `
        <div class="line__row">
            <div class="line-part line-part--75 line-part--start">
                <switch-input 
                    v-bind:value="'subject'"
                    v-bind:line="line"></switch-input>
            </div>
            <div class="line-part line-part--25 line-part--end">
                <switch-input 
                    v-bind:value="'value'"
                    v-bind:line="line"
                    v-bind:size="'number'"></switch-input>&nbsp;{{line.document.currency}}
            </div>
        </div>
        
    `
});

export {sumLineComponent}

