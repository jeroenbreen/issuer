import Vue from 'vue';


const hourlyLineComponent = Vue.component('hourly-line', {
    methods: {},
    props: ['line'],
    template: `
        <div class="line__row">
            <div class="line-part line-part--50 line-part--start">
                <input v-model="line.subject">
            </div>
            <div class="line-part line-part--25 line-part--middle line-part__set">
                <input v-model.number="line.hours" class="line-input--number">
                ×
                <input v-model.number="line.rate" class="line-input--number"> 
                {{line.document.currency}}
            </div>
            <div class="line-part line-part--end line-part--25">
                {{line.getValue() | currency}} {{line.document.currency}}
            </div>
        </div>
        
    `
});

export {hourlyLineComponent}

