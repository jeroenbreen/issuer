<script>
    import documentIndex from "@components/document/document-index";
    import docPage from "@components/document/page";
    import templateDocumentTools from "./template-document-tools";
    import templatePageTools from "./template-page-tools";
    import templateItemTools from "./template-item-tools";
    import {Document} from "@models/Document";
    import {Template} from "@models/Template";
    import $ from 'jquery';

    let saveBuffer = null;

    export default {
        name: 'template-editor',
        components: {
            documentIndex, docPage, templateDocumentTools, templatePageTools, templateItemTools
        },
        props: ['template', 'document'],
        data(){
            return {
                clonedTemplate: new Template(this.template.clone()),
                showTools: false,
                currentItem: null,
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
                return this.$store.state.templateEditor.currentItemIndex !== null ? this.template.items[this.$store.state.templateEditor.currentItemIndex] : null;
            },
            onDeselectItem() {
                this.$store.commit('templateEditor/unsetCurrentItemIndex');
            },
            generalClick(event) {
                let target = $(event.target);

                function isItemArea(element) {
                    const areas = ['vdr', 'template-tools'];
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

        <div class="template-tools__left" v-if="!showTools">
            <template-document-tools
                :template="clonedTemplate"/>

            <template-page-tools
                v-if="document.state.currentPage"
                :template="clonedTemplate"
                :current-page="document.state.currentPage"/>
        </div>

        <div class="template-tools__right" v-if="!showTools">
            <template-item-tools
                v-if="getCurrentItem()"
                :item="getCurrentItem()"
                :template="clonedTemplate"
                :current-page="document.state.currentPage"/>
        </div>




        <div class="template__mode">
            <md-switch v-model="showTools">Hide tools</md-switch>
        </div>

        <input class="document__zoom" v-model="factor">

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
    @import './template-tools.scss';

    .template-tools__left {
        position: fixed;
        left: 40px;
        top: 40px;
        height: calc(100% - 40px);
        overflow: auto;
    }

    .template-tools__right {
        position: fixed;
        right: 80px;
        top: 40px;
        height: calc(100% - 40px);
        overflow: auto;
    }

    .template-editor {
        position: absolute;
        left: calc(50% - 310px);
        width: 620px;
        line-height: 1.6;

        .page {
            margin-bottom: 40px;
            top: 40px;
            box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);


            &.template--active {
                background: $editing-mode-color-light;

                .vdr {

                    &:before {
                        outline: 1px dashed $editing-mode-color;
                        content: '';
                        width: 100%;
                        height: 100%;
                        top: 0;
                        left: 0;
                        position: absolute;
                        pointer-events: none;
                    }

                    .vdr-stick {
                        border: 1px solid $editing-mode-color;
                        background: #fff;
                        box-shadow: none;
                        -webkit-box-shadow: none;
                    }
                }

                .iss-resizable {
                    outline: 1px dashed $editing-mode-color;
                    cursor: pointer;

                    .handle {
                        border: 1px solid $editing-mode-color;
                        background: #fff;
                    }
                }

                .iss-resizer {
                    position: absolute;
                    cursor: pointer;

                    &:before {
                        outline: none;
                    }

                    .vdr-stick {
                        display: none;
                    }


                    &.iss-resizer--hor {
                        height: 1px;
                        width: 100%;

                        &:before {
                            left: calc(50% - 32px);
                            top: calc(50% - 2px);
                            width: 64px;
                            height: 1px;
                            border-top: 1px solid $editing-mode-color;
                        }
                    }

                    &.iss-resizer--ver {
                        width: 1px;
                        height: 100%;

                        &:before {
                            top: calc(50% - 32px);
                            left: calc(50% - 2px);
                            height: 64px;
                            width: 1px;
                            border-left: 1px solid $editing-mode-color;
                        }
                    }

                    &:before {
                        position: absolute;
                        content: '';
                    }

                    &:after {
                        position: absolute;
                        left: calc(50% - 17px);
                        top: calc(50% - 17px);
                        border: 1px solid $editing-mode-color;
                        content: '';
                        width: 32px;
                        height: 32px;
                        border-radius: 50%;
                    }
                }
            }

            .document__elements {
                background: #fff;
            }

            &:last-child {
                margin-bottom: 200px;
            }
        }
    }

    .template__mode {
        position: fixed;
        left: 20px;
        bottom: 20px;
        color: #fff;
    }

    .document__zoom {
        position: fixed;
        left: 20px;
        bottom: 80px;
        color: #fff;
    }

    .template__input {
        border: 1px dashed $editing-mode-color;
        background:transparent;
        outline: none;
        padding: 0;
        margin: 0;
        width: 60px;

        &.template__input--align-right {
            text-align: right;
        }

        &.template__input--bold {
            font-weight: 700;
        }

        &:focus {
            border: 1px solid $editing-mode-color;
        }
    }
</style>