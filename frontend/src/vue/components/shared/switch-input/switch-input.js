import Vue from 'vue';


const switchInputComponent = Vue.component('switch-input', {
    methods: {},
    props: ['line', 'value', 'size', 'editable'],
    template: `
        <div class="switch-input">
            <input 
                v-if="editable"
                v-model="line[value]"
                v-bind:class="['line-input--' + size]">
            <span v-if="!editable">
                {{line[value]}}
            </span>
        </div>
        
    `
});

export {switchInputComponent}

