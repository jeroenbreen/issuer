import Vue from 'vue';


const templateMarginsComponent = Vue.component('template-margins', {
    props: ['template'],
    methods: {
    },
    template: `
        <div class="template-margins">
            <div class="template-tools__section">
                <div class="template-tools__row">
                    <div class="template-tools__label">
                        Margin top
                    </div>
                    <md-field>
                        <md-input v-model="template.settings.margin.top" placeholder="Margin top" type="number"></md-input>
                    </md-field>
                </div>
                <div class="template-tools__row">
                    <div class="template-tools__label">
                        Margin right
                    </div>
                    <md-field>
                        <md-input v-model="template.settings.margin.right" placeholder="Margin right" type="number"></md-input>
                    </md-field>
                </div>
                <div class="template-tools__row">
                    <div class="template-tools__label">
                        Margin bottom
                    </div>
                    <md-field>
                        <md-input v-model="template.settings.margin.bottom" placeholder="Margin bottom" type="number"></md-input>
                    </md-field>
                </div>
                <div class="template-tools__row">
                    <div class="template-tools__label">
                        Margin left
                    </div>
                    <md-field>
                        <md-input v-model="template.settings.margin.left" placeholder="Margin left" type="number"></md-input>
                    </md-field>
                </div>
            </div>
        </div>
    `
});

export {templateMarginsComponent}

