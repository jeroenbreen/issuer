import Vue from 'vue';


const hourlyLineComponent = Vue.component('hourly-line', {
    methods: {},
    props: ['line'],
    template: `
        <div class="hourly-line line__content">
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
                {{line.document.currency}}
            </div>
            <div class="line__value">
                {{line.getValue() | currency}} {{line.document.currency}}
            </div>
        </div>
        
    `
});

export {hourlyLineComponent}

