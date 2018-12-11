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
            function getRandomLine() {
                let words, index, subject;
                words = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut quam sed arcu varius porttitor. Praesent sed tincidunt turpis. Cras condimentum lacus id ultrices imperdiet. Aliquam porttitor ut mi eu pellentesque. Sed fringilla turpis nunc, nec gravida metus suscipit ut. Sed a ipsum placerat, iaculis nulla ut, fermentum ipsum. Nam iaculis velit massa, eu rhoncus lorem mattis non. Integer ultrices a arcu sed consectetur. Ut scelerisque lectus sit amet sodales pharetra. Curabitur id tincidunt libero. Nullam consequat vestibulum rhoncus. Fusce in sapien ex.'.split(' ');
                index = Math.max(Math.round(Math.random() * words.length) - 4, 0);
                subject = words.splice(index, 4).join(' ');
                subject = subject.charAt(0).toUpperCase() + subject.slice(1);

                return {
                    type: 'hourly',
                    subject: subject,
                    rate: doc.rate,
                    hours: Math.round(Math.random() * 7) + 1
                }
            }

            function getRandomSet() {
                var lines = [];
                while (lines.length < 4) {
                    lines.push(getRandomLine());
                }
                return lines;
            }


            // creates a blank document suitable to display the template
            const doc = new Document();
            doc.documentId = 1;
            doc.subject = 'Dummy document';
            doc.createPage();
            doc.createPage();
            doc.userName = this.$store.state.users.current ? this.$store.state.users.current.getFullName() : '...';
            doc.currency = 'EUR';
            doc.rate = this.$store.state.settings.standardRate;
            doc.clientCompanyName = 'The Company Name';
            doc.clientContactName = 'M. Jones-Gonzalez';
            doc.clientStreet = 'East Street 1230';
            doc.clientPostcode = '1234 AA';
            doc.clientCity = 'City Name';
            doc.pages[0].importLines(getRandomSet());
            doc.pages[1].importLines(getRandomSet());

            return {
                standardTemplate: {
                    invoice: this.$store.state.settings.template_invoice_id,
                    quotation: this.$store.state.settings.template_quotation_id
                },
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
            isCurrentTemplate(template, type) {
                return this.$store.state.settings['template_' + type + '_id'] === template._id;
            },
            setTemplate(template) {
                const settings = {...this.$store.state.settings};
                settings.template_id = template._id;
                this.$store.commit('settings/update', settings);
            },
            setTemplateViaSelect(type){
                const settings = {...this.$store.state.settings};
                settings['template_' + type + '_id'] = this.standardTemplate[type];
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
            <div class="template__pickers">
                <div class="template__picker">
                    <md-field>
                        <label>Standard invoice template</label>
                        <md-select
                                @md-selected="setTemplateViaSelect('invoice')"
                                v-model="standardTemplate.invoice"
                                placeholder="Standard invoice template">
                            <md-option
                                    v-for="(template, index) in getAll()"
                                    :value="template._id"
                                    :key="index">{{template.title}}</md-option>
                        </md-select>
                    </md-field>
                    <div class="colored-bullet colored-bullet--invoice"></div>
                </div>
                <div class="template__picker">
                    <md-field>
                        <label>Standard quotation template</label>
                        <md-select
                                @md-selected="setTemplateViaSelect('quotation')"
                                v-model="standardTemplate.quotation"
                                placeholder="Standard quotation template">
                            <md-option
                                    v-for="(template, index) in getAll()"
                                    :value="template._id"
                                    :key="index">{{template.title}}</md-option>
                        </md-select>
                    </md-field>
                    <div class="colored-bullet colored-bullet--quotation"></div>
                </div>
            </div>
        </div>
        <div class="view-frame-section">
            <md-button @click="create()" class="md-primary">Create Template</md-button>
        </div>
        <div class="view-frame-section">
            <div class="templates">
                <div
                    v-for="(template, index) in getAll()"
                    :class="{'template--invoice': isCurrentTemplate(template, 'invoice'),
                    'template--quotation': isCurrentTemplate(template, 'quotation')}"
                    class="template__container">
                    <div class="template__title">
                        {{template.title}}
                    </div>
                    <doc-page
                        @click.native="editTemplate(template)"
                        :key="index"
                        :page="document.pages[0]"
                        :template="template"
                        :editor="false"
                        :factor="0.25"
                        :tools="false"/>

                    <div class="template__tools">
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

        <template-editor
            v-if="getCurrentTemplate()"
            :template="getCurrentTemplate()"
            :document="document"/>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .template__pickers {

        .template__picker {
            width: 300px;
            display: flex;
            align-items: center;

            .colored-bullet {
                display: inline-block;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                margin-left: 4px;

                &.colored-bullet--quotation {
                    @include quotationBackground();
                }

                &.colored-bullet--invoice {
                    @include invoiceBackground();
                }
            }
        }
    }

    .templates {
        display: flex;
        flex-wrap: wrap;

        .template__container {
            padding: 16px;
            border: 1px solid transparent;
            cursor: pointer;
            position: relative;
            margin: 2px;

            &.template--invoice {
                border: 2px solid $invoice-color-1;
            }

            &.template--quotation {
                border: 2px solid $quotation-color-1;
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