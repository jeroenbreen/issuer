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
            currentTemplate: null,
            image: 'https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA5OS8zMjkvb3JpZ2luYWwvY2hpbXBzLWVhdC1tb25rZXktYnJhaW5zLTAx'
        }
    },
    methods: {
        getAll: function(){
            return this.$store.state.templates.all;
        },
        create: function() {
            let template = new Template();
            this.$store.dispatch('templates/create', template.toBackend()).then((response) => {
                console.log(response);
                let createdTemplate = this.$store.getters['templates/getItemById'](response._id);
                console.log(createdTemplate);
                this.$store.commit('templates/setCurrent', createdTemplate);
            });
        },
        editTemplate: function(template) {
            this.$store.commit('templates/setCurrent', template);
        },
        getCurrentTemplate() {
            return this.$store.state.templates.current;
        },
        cloneTemplate(template) {
            let clone, titleProperties;
            clone = new Template(template.clone());

            function hasCloneTitle(template) {
                let titleLength = template.title.length,
                    i = 1,
                    lastChar = template.title[titleLength - i],
                    number = '';
                if (lastChar !== ')') {
                    return {
                        title: false
                    };
                }
                i++;
                lastChar = template.title[titleLength - i];


                while (!isNaN(lastChar)) {
                    number += lastChar;
                    i++;
                    lastChar = template.title[titleLength - i];
                }

                number = Number(number);

                lastChar = template.title[titleLength - i];
                if (lastChar !== '(') {
                    return {
                        title: false
                    };
                }
                return {
                    title: true,
                    number: number,
                    numberLength: number.toString().length
                }
            }

            titleProperties = hasCloneTitle(clone);

            if (titleProperties.title) {
                clone.title = clone.title.substr(0, clone.title.length - (titleProperties.numberLength + 1)) + (titleProperties.number + 1) + ')';
            } else {
                clone.title += ' (1)';
            }
            this.$store.dispatch('templates/create', clone);
        },
        deleteTemplate(template) {
            const store = this.$store;

            function callback() {
                store.dispatch('templates/delete', template);
            }

            this.$store.commit('confirm', {
                message: 'Are you sure?',
                callback: callback
            });
        },
        isCurrentTemplate(template) {
            return this.$store.state.settings.template_id === template._id;
        },
        setTemplate(template) {
            const settings = {...this.$store.state.settings};
            settings.template_id = template._id;
            this.$store.commit('settings/update', settings);
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
                    <div 
                        v-for="(template, index) in getAll()"
                        v-bind:class="{'template--current': isCurrentTemplate(template)}"
                        class="template__container">
                        <div class="template__title">
                            {{template.title}}
                        </div>
                        <div v-on:click="setTemplate(template)" class="template__select"></div>
                        <doc-page 
                            v-bind:key="index"
                            v-bind:page="document.pages[0]"
                            v-bind:template="template"
                            v-bind:editor="false"
                            v-bind:factor="0.25"
                            v-bind:tools="false"></doc-page>
 
                        <div class="template__tools">
                            <div class="icon-button" v-on:click="editTemplate(template)">
                                <div class="icon-button__icon">
                                    <i class="fas fa-pen"></i>
                                </div>
                            </div>
                            <div class="icon-button" v-on:click="cloneTemplate(template)">
                                <div class="icon-button__icon">
                                    <i class="fas fa-clone"></i>
                                </div>
                            </div>
                            <div class="icon-button" v-on:click="deleteTemplate(template)">
                                <div class="icon-button__icon">
                                    <i class="fas fa-trash"></i>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
            <div class="view-frame-section">
                <md-button v-on:click="create()" class="md-primary">Create Template</md-button>
            </div>
            
            <template-editor
                v-if="getCurrentTemplate()"
                v-bind:template="getCurrentTemplate()"
                v-bind:document="document"/>
        </div>
    `
});

export {templatesComponent}