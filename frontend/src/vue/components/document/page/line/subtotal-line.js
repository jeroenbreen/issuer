import Vue from 'vue';


const subtotalLineComponent = Vue.component('subtotal-line', {
    methods: {},
    props: ['line'],
    template: `
        <div class="line__subtotal">
            <div class="line__row line__row--heavy">
                <div class="line-part line-part--75 line-part--start">
                    Subtotaal
                </div>
                <div class="line-part line-part--25 line-part--end">
                    {{line.getValue() | currency}}
                    {{line.document.currency}}
                </div>
            </div>
            <div class="line__row">
                <div class="line-part line-part--75 line-part--start">
                    BTW 21%
                </div>
                <div class="line-part line-part--25 line-part--end">
                    {{line.getValue(21) | currency}}
                    {{line.document.currency}}
                </div>
            </div>
        </div>
        
        
    `
});

export {subtotalLineComponent}

