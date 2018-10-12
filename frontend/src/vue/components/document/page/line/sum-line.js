import Vue from 'vue';


const sumLineComponent = Vue.component('sum-line', {
    methods: {},
    props: ['line'],
    template: `
        <div class="line__row">
            <div class="line-part line-part--75 line-part--start">
                <input v-model="line.subject">
            </div>
            <div class="line-part line-part--25 line-part--end">
                <input v-model="line.value" class="line-input--big-number">
                {{line.document.currency}}
            </div>
        </div>
        
    `
});

export {sumLineComponent}

