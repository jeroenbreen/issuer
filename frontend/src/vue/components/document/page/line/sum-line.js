import Vue from 'vue';


const sumLineComponent = Vue.component('sum-line', {
    methods: {},
    props: ['line'],
    template: `
        <div class="sum-line line__content">
            <div class="line__subject">
                <input v-model="line.subject">
            </div>
            <div class="line__value">
                <input v-model="line.value">
                {{line.document.currency}}
            </div>
        </div>
        
    `
});

export {sumLineComponent}

