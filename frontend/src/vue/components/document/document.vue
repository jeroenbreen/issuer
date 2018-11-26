<script>
    import documentIndex from "./document-index";
    import documentProperties from "./document-properties";
    import lineTools from "./page/line/line-tools";
    import {DocumentPropertyHandler} from "./document-property-handler";
    import docPage from "./page";
    import {Document} from "@models/Document";
    import $ from "jquery";

    let saveBuffer = null;

    export default {
        name: 'document',
        components: {
            documentIndex, lineTools, docPage, documentProperties
        },
        data(){
            let document = new Document(this.$store.state.documents.current.clone());
            let company = this.$store.state.company;
            let template = this.$store.getters.template(document.type);
            let documentIdFormatter = this.$root.$options.filters.documentIdFormatter;
            let documentIdFormat = this.$store.state.settings.documentIdFormat;
            let dateFormatter = this.$root.$options.filters.dateFormatter;
            let store = this.$store;
            return {
                factor: 1,
                document: document,
                template: template,
                company: company,
                localState: {
                    showSnackbar: false
                },
                documentPropertyHandler: new DocumentPropertyHandler(
                    store, template, company, document, null, documentIdFormatter, documentIdFormat, dateFormatter
                ),
                test: document.subject
            }
        },
        watch: {
            document: {
                handler: function() {
                    // todo document.state should either be excluded from the watch
                    // or be stored in the database
                    if (saveBuffer) {
                        clearTimeout(saveBuffer);
                    }
                    saveBuffer = setTimeout(() => {
                        this.$store.dispatch('documents/update', this.document.toBackend()).then(() => {
                            this.localState.showSnackbar = true;
                        });
                    }, 500)
                },
                deep: true
            }
        },
        methods: {
            deleteDocument() {
                const store = this.$store;
                let self = this;

                function callback() {
                    // use the current document for deleting, since this.document is a clone of it
                    store.dispatch('documents/delete', store.state.documents.current).then(() => {
                        self.closeScreen();
                    });
                }

                this.$store.commit('confirm', {
                    message: 'Are you sure?',
                    callback: callback
                });


            },
            deletePage(page) {
                let document = this.document;

                function callback() {
                    let index = document.pages.indexOf(page);
                    document.pages.splice(index, 1);
                }

                this.$store.commit('confirm', {
                    message: 'Are you sure you want to delete page ' + (page.getIndex() + 1) + '? You will lose the content of this page.',
                    callback: callback
                });
            },
            getDocumentId() {
                return this.document.getFormattedId(this.$root.$options.filters.documentIdFormatter, this.$store.state.settings.documentIdFormat);
            },
            closeScreen() {
                this.$store.commit('documents/unsetCurrent');
                this.$router.push({query: { document: null }})
            },
            createPage() {
                this.document.createPage();
            },
            print() {
                const document = this.document.toPrint(this.$root.$options.filters.currency);
                document.documentIdFormatted = this.getDocumentId();
                document.dateFormatted = this.$root.$options.filters.standardDate(this.document.date);
                $.ajax({
                    'url': (config.fromFrontend + config.printUrl + '/document/print.php'),
                    'type': 'POST',
                    'data': JSON.stringify({
                        document: document,
                        template: this.template.toPrint(),
                        company: {...this.company}
                    }),
                    'headers': {
                        'Accept': 'application/json'
                    }
                }).done(function(response){
                    window.open(config.fromFrontend + config.pdfUrl + response);
                });
            }
        }
    }
</script>


<template>
    <div class="cover document__container">
        <div class="document" :class="{'document--locked': document.locked}">
            <doc-page
                    v-for="(page, index) in document.pages"
                    :key="index"
                    :page="page"
                    :template="template"
                    :editor="false"
                    :factor="factor"
                    :tools="true"></doc-page>
        </div>
        <document-index
            v-if="document.pages.length > 1"
            :document="document"
            :factor="factor"/>

        <div class="tool-box__left">
            <div class="tool-box">
                <div class="tool-box__header">
                    Document
                </div>
                <div class="tool-box__section">
                    <div class="tool-button" @click="print()">
                        <div class="tool-button__icon">
                            <i class="fas fa-print"></i>
                        </div>
                        <div class="tool-button__label">
                            Print
                        </div>
                    </div>

                    <div
                        v-if="!document.locked"
                        @click="deleteDocument()"
                        class="tool-button">
                        <div class="tool-button__icon">
                            <i class="fas fa-trash"></i>
                        </div>
                        <div class="tool-button__label">
                            Remove
                        </div>
                    </div>
                </div>
            </div>

            <document-properties
                v-if="!document.locked"
                :document-property-handler="documentPropertyHandler"/>
        </div>

        <div class="tool-box__right" v-if="!document.locked">
            <div class="template-item-tools tool-box">
                <div class="tool-box__header">
                    Document
                </div>
                <div class="tool-box__section">
                    <div
                        @click="createPage()"
                        class="tool-button">
                        <div class="tool-button__icon">
                            <i class="fas fa-plus"></i>
                        </div>
                        <div class="tool-button__label">
                            Add page
                        </div>
                    </div>
                </div>
            </div>

            <div class="tool-box">
                <div class="tool-box__header">
                    Page ({{(document.state.currentPage.getIndex() + 1)}})
                </div>
                <div class="tool-box__section">
                    <div
                        @click="deletePage(document.state.currentPage)"
                        class="tool-button">
                        <div class="tool-button__icon">
                            <i class="fas fa-trash"></i>
                        </div>
                        <div class="tool-button__label">
                            Remove current page
                        </div>
                    </div>
                </div>
                <line-tools
                    v-if="!document.locked"
                    :page="document.state.currentPage"
                    :can-add-lines="true"/>
            </div>
        </div>


        <md-snackbar :md-position="'left'" :md-duration="2000" :md-active.sync="localState.showSnackbar" md-persistent>
            <span>Saved...</span>
        </md-snackbar>

        <div class="close-button" @click="closeScreen()"></div>

        <div class="document__mode">
            Locked<br>
            <md-switch v-model="document.locked"></md-switch>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .document {
        position: absolute;
        left: 580px;
        width: 620px;
        line-height: 1.6;

        .page {
            margin-bottom: 40px;
            top: 40px;
            box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);

            &:last-child {
                margin-bottom: 200px;
            }
        }
    }

    .document__mode {
        position: fixed;
        right: 10px;
        bottom: 20px;
        color: #fff;

        .md-switch {
            margin-top: 6px;
        }
    }
</style>