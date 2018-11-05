import Vue from 'vue';
import {Document} from "../../../../store/models/Document";
import {Template} from "../../../../store/models/Template";


let saveBuffer = null;

const templateEditorComponent = Vue.component('template-editor', {
    props: ['template', 'document'],
    data(){
        return {
            templateTitle: this.template.title
        }
    },
    watch: {
        templateTitle: function(){
            if (saveBuffer) {
                clearTimeout(saveBuffer);
            }
            saveBuffer = setTimeout(() => {
                let template = new Template(this.template);
                template.title = this.templateTitle;
                this.$store.dispatch('templates/update', template);
            }, 500)
        }
    },
    methods: {
        closeScreen() {
            this.$store.commit('templates/unsetCurrent');
        }
    },
    template: `
        <div class="cover">
            <div class="template-editor">
                <doc-page 
                    v-bind:page="document.pages[0]"
                    v-bind:template="template"
                    v-bind:factor="1"
                    v-bind:tools="false"
                    v-bind:editor="true"></doc-page>
                <doc-page 
                    v-bind:page="document.pages[1]"
                    v-bind:template="template"
                    v-bind:factor="1"
                    v-bind:tools="false"
                    v-bind:editor="true"></doc-page>
            </div>
            
            <div class="template-editor__title">
                <md-field>
                    <label>Title</label>
                    <md-input v-model="templateTitle" placeholder="Title"></md-input>
                </md-field>
            </div>

            
            <div class="close-button" v-on:click="closeScreen()"></div>
        </div>
    `
});

export {templateEditorComponent}

