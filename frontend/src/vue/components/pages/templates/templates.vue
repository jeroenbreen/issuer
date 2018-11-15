<script>
    import templateEditor from './template-editor';
    import docPage from '@components/document/page';
    import {Document} from "@models/Document";
    import {Template} from "@models/Template";

    export default {
        name: 'templates',
        components: {
            docPage, templateEditor
        },
        data() {
            // creates a blank document suitable to display the template
            const doc = new Document();
            doc.documentId = 1;
            doc.createPage();
            doc.createPage();
            doc.currency = 'EUR';
            doc.rate = this.$store.state.settings.standardRate;
            doc.clientCompanyName = 'The Company';
            doc.clientContactName = 'M. Jones';
            doc.clientStreet = 'Street 123';
            doc.clientPostcode = '1234 AA';
            doc.clientCity = 'City';
            doc.pages[0].createLine('hourly');
            doc.pages[1].createLine('hourly');
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
                let template = new Template();
                this.$store.dispatch('templates/create', template.toBackend()).then((response) => {
                    let createdTemplate = this.$store.getters['templates/getItemById'](response._id);
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
        }
    }
</script>


<template>
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
                    :class="{'template--current': isCurrentTemplate(template)}"
                    class="template__container">
                    <div class="template__title">
                        {{template.title}}
                    </div>
                    <div @click="setTemplate(template)" class="template__select"></div>
                    <doc-page
                        :key="index"
                        :page="document.pages[0]"
                        :template="template"
                        :editor="false"
                        :factor="0.25"
                        :tools="false"/>

                    <div class="template__tools">
                        <div class="icon-button" @click="editTemplate(template)">
                            <div class="icon-button__icon">
                                <i class="fas fa-pen"></i>
                            </div>
                        </div>
                        <div class="icon-button" @click="cloneTemplate(template)">
                            <div class="icon-button__icon">
                                <i class="fas fa-clone"></i>
                            </div>
                        </div>
                        <div class="icon-button" @click="deleteTemplate(template)">
                            <div class="icon-button__icon">
                                <i class="fas fa-trash"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="view-frame-section">
            <md-button @click="create()" class="md-primary">Create Template</md-button>
        </div>

        <template-editor
            v-if="getCurrentTemplate()"
            :template="getCurrentTemplate()"
            :document="document"/>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .templates {
        display: flex;
        flex-wrap: wrap;

        .template__container {
            padding: 16px;
            border: 1px solid transparent;
            cursor: pointer;
            position: relative;

            &.template--current {
                border: 1px solid $main-theme-color;
            }

            .page {
                box-shadow: 1px 1px 12px rgba(0, 0, 0, 0.5);
                overflow: hidden;
            }

            .template__select {
                position: absolute;
                left: 16px;
                top: 62px;
                width: 155px;
                height: 220px;
                z-index: 1;
                cursor: pointer;
            }

            .template__title {
                height: 36px;
                margin-bottom: 10px;
                line-height: 1;
                font-weight: 700;
                width: 155px;
                text-align: center;
            }

            .template__tools {
                margin-top: 16px;
                display: flex;
                justify-content: center;
            }
        }
    }
</style>