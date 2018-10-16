import Vue from 'vue';


const switchInputComponent = Vue.component('switch-input', {
    methods: {},
    props: ['line', 'value', 'size'],
    template: `
        <div class="switch-input">
            <input 
                v-if="!line.document.locked"
                v-model="line[value]"
                v-bind:class="['line-input--' + size]">
            <span v-if="line.document.locked">{{line[value]}}</span>
        </div>
        
    `
});

export {switchInputComponent}

