import Vue from 'vue';
import {templateEditorComponent} from './template-editor/template-editor';
import {Document} from "../../../store/models/Document";
import {Template} from "../../../store/models/Template";



const templatesComponent = Vue.component('templates', {
    data() {
        // creates a blank document suitable to display the template
        const doc = new Document();
        doc.documentId = 1;
        doc.createPage();
        doc.createPage();
        return {
            document: doc,
            currentTemplate: null
        }
    },
    methods: {
        getAll: function(){
            return this.$store.state.templates.all;
        },
        create: function() {
            this.$router.push('templates/new');
        },
        selectTemplate: function() {
            let template = this.getAll()[0];
            this.currentTemplate = new Template(template.clone());
        }
    },
    template: `
        <div class="view-frame view-frame--templates" v-scrim>
            <div class="view-frame-section">
                <h1>
                    Templates
                </h1>
            </div>
            <div class="view-frame-section">
                <div class="templates">
                    <doc-page 
                        v-for="(template, index) in getAll()"
                        v-on:click="selectTemplate(template)"
                        v-bind:key="index"
                        v-bind:page="document.pages[0]"
                        v-bind:template="template"
                        v-bind:editor="true"
                        v-bind:factor="0.25"
                        v-bind:tools="false"></doc-page>
                </div>
            </div>
            <div class="view-frame-section">
                <md-button v-on:click="selectTemplate()" class="md-primary">Edit Template</md-button>
            </div>
            <div class="view-frame-section">
                <md-button v-on:click="create()" class="md-primary">Create Template</md-button>
            </div>
            
            <template-editor
                v-if="currentTemplate"
                v-bind:template="currentTemplate"
                v-bind:document="document"/>
        </div>
    `
});

export {templatesComponent}