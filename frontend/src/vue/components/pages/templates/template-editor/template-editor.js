import Vue from 'vue';


const templateEditorComponent = Vue.component('template-editor', {
    props: ['template', 'document'],
    methods: {
    },
    template: `
        <div class="cover">
            <div class="template-editor">
                <doc-page 
                    v-bind:page="document.pages[0]"
                    v-bind:template="template"
                    v-bind:factor="1"
                    v-bind:tools="false"></doc-page>
                <doc-page 
                    v-bind:page="document.pages[1]"
                    v-bind:template="template"
                    v-bind:factor="1"
                    v-bind:tools="false"></doc-page>
            </div>
        </div>
    `
});

export {templateEditorComponent}

