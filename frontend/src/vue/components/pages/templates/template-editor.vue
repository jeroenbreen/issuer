<script>
    import documentIndex from "@components/document/document-index";
    import docPage from "@components/document/page";
    import templateToolsDocument from "./template-tools/template-tools-document";
    import templateToolsPage from "./template-tools/template-tools-page";
    import templateToolsItem from "./template-tools/template-tools-item";

    import {Document} from "@models/Document";
    import {Template} from "@models/Template";

    import $ from 'jquery';

    let saveBuffer = null;

    export default {
        name: 'template-editor',
        components: {
            documentIndex, docPage, templateToolsDocument, templateToolsPage, templateToolsItem
        },
        props: ['template', 'document'],
        data(){
            return {
                clonedTemplate: new Template(this.template.clone()),
                showTools: false,
                localState: {
                    showSnackbar: false
                },
                factor: 1
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
            getCurrentItem() {
                return this.$store.state.templateEditor.currentItemIndex !== null ? this.clonedTemplate.items[this.$store.state.templateEditor.currentItemIndex] : null;
            },
            onDeselectItem() {
                this.$store.commit('templateEditor/unsetCurrentItemIndex');
            },
            generalClick(event) {
                let target = $(event.target);

                function isItemArea(element) {
                    const areas = ['item', 'tool-box'];
                    for (let area of areas) {
                        if (element.parents('.' + area).length > 0 || element.hasClass(area)) {
                            return true;
                        }
                    }
                    return false;
                }


                if (!isItemArea(target)) {
                    this.onDeselectItem();
                }
            }
        },
    }
</script>


<template>
    <div class="cover document__container" @click="generalClick($event)">
        <div class="template-editor">
            <doc-page
                :page="document.pages[0]"
                :template="clonedTemplate"
                :factor="factor"
                :tools="false"
                :editor="!showTools"/>
            <doc-page
                :page="document.pages[1]"
                :template="clonedTemplate"
                :factor="factor"
                :tools="false"
                :editor="!showTools"/>
        </div>

        <document-index
            :document="document"
            :factor="factor"/>




        <div class="close-button" @click="closeScreen()"></div>

        <div class="tool-box__left" v-if="!showTools">
            <template-tools-document
                :template="clonedTemplate"/>

            <template-tools-page
                v-if="document.state.currentPage"
                :template="clonedTemplate"
                :current-page="document.state.currentPage"/>
        </div>

        <div class="tool-box__right" v-if="!showTools">
            <template-tools-item
                v-if="getCurrentItem()"
                :item="getCurrentItem()"
                :template="clonedTemplate"
                :current-page="document.state.currentPage"/>
        </div>




        <div class="template__mode">
            Hide tools<br>
            <md-switch v-model="showTools"></md-switch>
        </div>

        <md-snackbar
            :md-position="'left'"
            :md-duration="2000"
            :md-active.sync="localState.showSnackbar"
            md-persistent>
            <span>Saved...</span>
        </md-snackbar>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .template-editor {
        position: absolute;
        left: 580px;
        width: 620px;
        line-height: 1.6;

        .page {
            margin-bottom: 40px;
            top: 40px;
            box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);

            .document__items {
                background: #fff;
            }

            &:last-child {
                margin-bottom: 200px;
            }
        }
    }

    .template__mode {
        position: fixed;
        right: 10px;
        bottom: 20px;
        color: #fff;

        .md-switch {
            margin-top: 6px;
        }
    }
</style>