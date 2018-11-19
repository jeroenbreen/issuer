<script>
    import documentIndex from "./document-index";
    import docPage from "./page";
    import {Document} from "@models/Document";
    import $ from "jquery";

    let saveBuffer = null;

    export default {
        name: 'document',
        components: {
            documentIndex, docPage
        },
        data(){
            let document = this.$store.state.documents.current.clone();
            return {
                factor: 1,
                document: new Document(document),
                template: this.$store.getters.template(document.type),
                company: this.$store.state.company,
                localState: {
                    showSnackbar: false
                }
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
                            console.log('saved...');
                        });
                    }, 500)
                },
                deep: true
            }
        },
        methods: {
            deleteDocument() {
                // use the current document for deleting, since this.document is a clone of it
                this.$store.dispatch('documents/delete', this.$store.state.documents.current).then(() => {
                    this.closeScreen();
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
            <div v-if="!document.locked" class="page__tools">
                <div
                        @click="createPage()"
                        class="icon-button icon-button--editing-mode">
                    <div class="icon-button__icon">
                        <i class="fas fa-plus"></i>
                    </div>
                </div>
            </div>
        </div>
        <document-index
            v-if="document.pages.length > 1"
            :document="document"
            :factor="factor"/>
        <div class="document__tools">

            <div class="tool-button tool-button--inverse" @click="print()">
                <div class="tool-button__icon">
                    <i class="fas fa-print"></i>
                </div>
                <div class="tool-button__label">
                    Print
                </div>
            </div>

            <div class="tool-button tool-button--inverse tool-button--warning" @click="deleteDocument()">
                <div class="tool-button__icon">
                    <i class="fas fa-trash"></i>
                </div>
                <div class="tool-button__label">
                    Remove
                </div>
            </div>
        </div>

        <md-snackbar :md-position="'left'" :md-duration="2000" :md-active.sync="localState.showSnackbar" md-persistent>
            <span>Saved...</span>
        </md-snackbar>

        <div class="close-button" @click="closeScreen()"></div>

        <div class="document__mode">
            <md-switch v-model="document.locked">Locked</md-switch>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .document {
        position: absolute;
        left: calc(50% - 310px);
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

    .document__tools {
        position: fixed;
        left: calc(50% + 340px);
        top: 40px;
        width: 100px;
        display: flex;
        flex-wrap: wrap;

        .iss-button {
            margin-bottom: 4px;
        }
    }

    .document__mode {
        position: fixed;
        right: 20px;
        bottom: 20px;
        color: #fff;
    }
</style>