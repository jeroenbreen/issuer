import Vue from 'vue';
import {templateToolsComponent} from "./template-tools/template-tools";
import {Document} from "../../../../store/models/Document";
import {Template} from "../../../../store/models/Template";


let saveBuffer = null;

const templateEditorComponent = Vue.component('template-editor', {
    props: ['template', 'document'],
    data(){
        return {
            clonedTemplate: new Template(this.template.clone()),
            showTools: false,
            currentItem: null,
            localState: {
                showSnackbar: false
            }
        }
    },
    watch: {
        clonedTemplate: {
            handler: function() {
                if (saveBuffer) {
                    clearTimeout(saveBuffer);
                }

                saveBuffer = setTimeout(() => {
                    this.$store.dispatch('templates/update', this.clonedTemplate.toBackend()).then(() => {
                        this.localState.showSnackbar = true;
                    });
                }, 500);
            },
            deep: true
        }
    },
    methods: {
        closeScreen() {
            this.$store.commit('templates/unsetCurrent');
        },
        onSelectItem(item) {
            this.currentItem = item;
        }
    },
    template: `
        <div class="cover">
            <div class="template-editor">
                <doc-page 
                    v-bind:page="document.pages[0]"
                    v-bind:template="clonedTemplate"
                    v-bind:factor="1"
                    v-bind:tools="false"
                    v-bind:editor="!showTools"
                    v-bind:onSelectItem="onSelectItem"></doc-page>
                <doc-page 
                    v-bind:page="document.pages[1]"
                    v-bind:template="clonedTemplate"
                    v-bind:factor="1"
                    v-bind:tools="false"
                    v-bind:editor="!showTools"
                    v-bind:onSelectItem="onSelectItem"></doc-page>
            </div>
            
            <div class="template-editor__title">
                <md-field>
                    <label>Title</label>
                    <md-input v-model="clonedTemplate.title" placeholder="Title"></md-input>
                </md-field>
            </div>

            
            <div class="close-button" v-on:click="closeScreen()"></div>
            
            <template-tools
                v-if="currentItem"
                v-bind:item="currentItem"
                v-bind:template="clonedTemplate"></template-tools>
            
            <div class="template__mode">
                <md-switch v-model="showTools">Hide tools</md-switch>
            </div>
            
            <md-snackbar :md-position="'left'" :md-duration="2000" :md-active.sync="localState.showSnackbar" md-persistent>
                <span>Saved...</span>
            </md-snackbar> 
        </div>
    `
});

export {templateEditorComponent}

