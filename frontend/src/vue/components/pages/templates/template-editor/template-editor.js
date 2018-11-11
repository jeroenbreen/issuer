import Vue from 'vue';
import {templateToolsComponent} from "./template-tools/template-tools";
import {templateMarginsComponent} from "./template-margins/template-margins";
import {Document} from "../../../../store/models/Document";
import {Template} from "../../../../store/models/Template";
import $ from 'jquery';

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
        },
        onDeselectItem() {
            this.currentItem = null;
        },
        generalClick(event) {
            let target = $(event.target);
            if (target.hasClass('cover')) {
                this.closeScreen();
            } else if (!target.hasClass('vdr') && !target.hasClass('vdr-stick')) {
                this.onDeselectItem();
            }
        }
    },
    template: `
        <div class="cover" v-on:click="generalClick($event)">
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
            
            <template-margins
                v-bind:template="clonedTemplate"></template-margins>
            
            <template-tools
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

