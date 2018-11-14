<script>
    import docPage from "@components/document/page";
    import templateTools from "./template-tools";
    import templateMargins from "./template-margins";
    import {Document} from "@models/Document";
    import {Template} from "@models/Template";
    import $ from 'jquery';

    let saveBuffer = null;

    export default {
        name: 'template-editor',
        components: {
            docPage, templateTools, templateMargins
        },
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
    }
</script>


<template>
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
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .template-editor__title {
        position: fixed;
        left: 20px;
        top: 40px;
        width: 250px;
        background: #fff;
        padding: 10px;
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
                    cursor: pointer;

                    &:before {
                        outline: 1px dashed $editing-mode-color;
                        content: '';
                        width: 100%;
                        height: 100%;
                        top: 0;
                        left: 0;
                        position: absolute;
                    }

                    .vdr-stick {
                        border: 1px solid $editing-mode-color;
                        background: #fff;
                        box-shadow: none;
                        -webkit-box-shadow: none;
                    }

                    &.active {
                        z-index: 10000000!important;
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
        right: 20px;
        bottom: 20px;
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