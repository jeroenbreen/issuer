<script>
    import item from "./page/item";
    import docLine from "./page/line";
    import lineTools from "./page/line/line-tools";
    import sortableList from "@components/shared/sortable-list";
    import $ from 'jquery'

    import {Template} from "@models/Template";


    let saveBuffer = null;

    export default {
        name: 'doc-page',
        components: {
            item, docLine, lineTools, sortableList
        },
        props: ['page', 'template', 'editor', 'factor', 'tools', 'onSelectItem'],
        watch: {
            clonedTemplate: {
                handler: function() {
                    if (this.editor) {
                        if (saveBuffer) {
                            clearTimeout(saveBuffer);
                        }
                        saveBuffer = setTimeout(() => {
                            this.$store.dispatch('templates/update', this.template.toBackend()).then(() => {
                                // todo: use 1 global snackbar
                                this.localState.showSnackbar = true;
                                // todo: update the original, so other pages
                                // are update with the edits
                            });
                        }, 500)
                    }
                },
                deep: true
            }
        },
        data(){
            return {
                company: this.$store.state.company,
                canAddLines: true,
                localState: {
                    showSnackbar: false
                }
            }
        },
        methods: {
            scale(value) {
                return value * this.factor;
            },
            getDocumentId() {
                return this.page.document.getFormattedId(this.$root.$options.filters.formatId, this.$store.state.settings.documentIdFormat);
            },


            // template methods
            getTop() {
                return this.page.getType() === 'front' ? this.scale(this.template.settings.content.top) + 'px' : 0;
            },
            getTotalTop() {
                return 200;
                //return this.page.getType() === 'front' ?  this.scale(this.template.settings.footerImage.top - 130) : this.scale(this.template.settings.footerImage.top + 30 - 130);
            },

            // sortable
            onSortStart(event) {
                $('.main').addClass('unselectable');
            },
            onSortEnd(event) {
                $('.main').removeClass('unselectable');
            },



            // template
            selectItem(item) {
                if (this.editor) {
                    this.onSelectItem(item);
                }
            },
            setMarginTop(event) {
                this.template.margin.top = event.top;
            },
            setMarginBottom(event) {
                this.template.margin.bottom = 877 - event.top;
            },
            setMarginLeft(event) {
                this.template.margin.left = event.left;
            },
            setMarginRight(event) {
                this.template.margin.right = 620 - event.left;
            }
        }
    }
</script>


<template>
    <div
            v-bind:style="{'font-size': scale(10) + 'px', 'width': scale(620) + 'px', 'height': scale(877) + 'px'}"
            v-bind:class="{'template--active': editor}"
            class="page">



        <div class="document__elements"
             v-bind:style="{'left': scale(template.margin.left) + 'px',
                               'top': scale(template.margin.top) + 'px',
                               'right': scale(template.margin.right) + 'px ',
                               'bottom': scale(template.margin.bottom) + 'px'}">




            <item
                    class="document__logo"
                    v-if="page.getType() === 'front'"
                    v-on:click.native="selectItem(template.logo)"
                    v-bind:item="template.logo"
                    v-bind:editor="editor"
                    v-bind:factor="factor"
                    v-bind:template="template"></item>




            <div class="document__info" v-if="page.getType() === 'front'">
                <div
                        v-bind:style="{'margin-right': scale(10) + 'px'}"
                        class="document__date">
                    {{page.document.date | standardDate}}
                </div>
                <div
                        v-bind:style="{'padding': scale(10) + 'px', 'font-size': scale(11) + 'px'}"
                        class="document__document-id">
                        <span v-if="!editor">
                            {{template.dictionary.invoice}}
                        </span>
                    <input v-else v-model="template.dictionary.invoice" class="template__input template__input--align-right">

                    <b>{{getDocumentId()}}</b>
                </div>
            </div>

            <div class="document__addresses"
                 v-if="page.getType() === 'front'"
                 v-bind:style="{'top': scale(template.settings.addresses.top) + 'px',
                                   'border-top': scale(template.settings.addresses.borderTop) + 'px solid #000'}">
                <div class="document_address-own">
                    <b>{{company.name}}</b><br>
                    {{page.document.userName}}<br>
                    {{company.address}}<br>
                    {{company.postcode}} {{company.city}}
                </div>
                <div class="document_address-client">
                    <b>{{page.document.clientCompanyName}}</b><br>
                    {{page.document.clientContactName}}<br>
                    {{page.document.clientStreet}}<br>
                    {{page.document.clientPostcode}} {{company.clientCity}}
                </div>
            </div>

            <div class="document__content"
                 v-bind:style="{'top': getTop()}">
                <div class="document__subject"
                     v-if="page.getType() === 'front'"
                     v-bind:style="{'border-top': scale(template.settings.subject.borderTop) + 'px solid #000',
                                       'border-bottom': scale(template.settings.subject.borderBottom) + 'px solid #000',
                                       'padding': scale(10) + 'px'}">
                    <span class="document__subject-about" v-if="!editor">{{template.dictionary.subject}}:</span>
                    <input v-else v-model="template.dictionary.subject" class="template__input template__input--bold">
                    {{page.document.subject}}
                </div>

                <div
                        v-bind:style="{'padding': scale(10) + 'px 0'}"
                        class="document__lines">
                    <sortable-list
                            lockAxis="y"
                            v-bind:useDragHandle="true"
                            v-model="page.lines"
                            v-on:sortStart="onSortStart($event)"
                            v-on:sortEnd="onSortEnd($event)">
                        <doc-line
                                v-for="(line, index) in page.lines"
                                v-bind:index="index"
                                v-bind:key="index"
                                v-bind:line="line"
                                v-bind:tools="tools"
                                v-bind:scale="scale"/>
                    </sortable-list>
                </div>

                <line-tools
                        v-if="canAddLines && !page.document.locked && tools"
                        v-bind:page="page"
                        v-bind:canAddLines="canAddLines"/>
            </div>

            <div class="document__total"
                 v-if="page.showTotal()"
                 v-bind:style="{'top': getTotalTop() + 'px'}">
                <div
                        v-bind:style="{'height': scale(20) + 'px'}"
                        class="document__total-line">
                    <div class="document__total-label">
                        Totaal
                    </div>
                    <div class="document__total-value">
                        {{page.document.getTotal() | currency}} {{page.document.currency}}
                    </div>
                </div>
                <div
                        v-bind:style="{'height': scale(20) + 'px'}"
                        class="document__total-line">
                    <div class="document__total-label">
                        BTW 21%
                    </div>
                    <div class="document__total-value">
                        {{page.document.getTotal() * 0.21 | currency}} {{page.document.currency}}
                    </div>
                </div>
                <div
                        v-bind:style="{'font-size': scale(15) + 'px', 'line-height': scale(16) + 'px', 'height': scale(20) + 'px'}"
                        class="document__total-line document__total-line--big">
                    <div class="document__total-label">
                        Te betalen
                    </div>
                    <div class="document__total-value">
                        {{page.document.getTotal() * 1.21 | currency}} {{page.document.currency}}
                    </div>
                </div>

                <div class="document__footer-text"
                     v-bind:style="{'font-size': scale(8) + 'px',
                                       'margin-top': scale(20) + 'px',
                                       'border-top': scale(template.settings.footerText.borderTop) + 'px solid #000',
                                       'border-bottom': scale(template.settings.footerText.borderBottom) + 'px solid #000',
                                       'padding': scale(10) + 'px'}">
                    <span v-html="template.dictionary.footer"></span>
                </div>
            </div>


            <!-- custom items -->
            <item
                    v-if="page.getType() === 'front'"
                    v-for="(item, index) in template.frontPage.items"
                    v-on:click.native="selectItem(item)"
                    v-bind:key="index"
                    v-bind:item="item"
                    v-bind:editor="editor"
                    v-bind:factor="factor"
                    v-bind:template="template"></item>


            <div class="document__official"
                 v-bind:style="{'font-size': scale(8) + 'px','top': scale(template.settings.official.top) + 'px'}">
                {{company.name}} | {{company.coc}}  | {{company.vat}}
            </div>
        </div>

        <vue-drag-resize
                v-if="editor && page.getType() === 'front'"
                class="iss-resizer iss-resizer--hor"
                v-bind:parentLimitation="true"
                v-bind:axis="'y'"
                v-on:dragging="setMarginTop"
                v-bind:isDraggable="editor"
                v-bind:isResizable="false"
                v-bind:y="scale(template.margin.top)"
                v-bind:x="scale(template.margin.left)"
                v-bind:h="1"
                v-bind:minh="1"
                v-bind:w="scale(620 - template.margin.left - template.margin.right)"/>

        <vue-drag-resize
                v-if="editor && page.getType() === 'front'"
                class="iss-resizer iss-resizer--hor"
                v-bind:parentLimitation="true"
                v-bind:axis="'y'"
                v-on:dragging="setMarginBottom"
                v-bind:isDraggable="editor"
                v-bind:isResizable="false"
                v-bind:y="scale(877 - template.margin.top)"
                v-bind:x="scale(template.margin.left)"
                v-bind:h="1"
                v-bind:minh="1"
                v-bind:w="scale(620 - template.margin.left - template.margin.right)"/>

        <vue-drag-resize
                v-if="editor && page.getType() === 'front'"
                class="iss-resizer iss-resizer--ver"
                v-bind:parentLimitation="true"
                v-bind:axis="'x'"
                v-on:dragging="setMarginLeft"
                v-bind:isDraggable="editor"
                v-bind:isResizable="false"
                v-bind:y="scale(template.margin.top)"
                v-bind:x="scale(template.margin.left)"
                v-bind:w="1"
                v-bind:minw="1"
                v-bind:h="scale(877 - template.margin.top - template.margin.bottom)"/>

        <vue-drag-resize
                v-if="editor && page.getType() === 'front'"
                class="iss-resizer iss-resizer--ver"
                v-bind:parentLimitation="true"
                v-bind:axis="'x'"
                v-on:dragging="setMarginRight"
                v-bind:isDraggable="editor"
                v-bind:isResizable="false"
                v-bind:y="scale(template.margin.top)"
                v-bind:x="scale(620 - template.margin.right)"
                v-bind:w="1"
                v-bind:minw="1"
                v-bind:h="scale(877 - template.margin.top - template.margin.bottom)"/>


        <md-snackbar :md-position="'left'" :md-duration="2000" :md-active.sync="localState.showSnackbar" md-persistent>
            <span>Saved...</span>
        </md-snackbar>
    </div>
</template>


<style lang="scss">      @import '@styles/variables.scss';


    .page {
        background: #fff;
        position: relative;
        line-height: 1.6;
    }

    .page__tools {
        margin: 60px 0;
        position: relative;
        left: calc(100% + 20px);
        display: flex;
        width: 100px;
    }

    .document__elements {
        position: absolute;

        .document__logo {

            img {
                width: 100%;
                height: auto;
            }
        }

        .document__info {
            position: absolute;
            right: 0;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: flex-end;

            .document__date {
                margin-right: $general-padding
            }

            .document__document-id {
                background: #eee;
                padding: $general-padding;
            }
        }

        .document__addresses {
            position: absolute;
            left: -10px;
            width: calc(100% + 20px);
            display: flex;
            padding: 10px;

            .document_address-own {
                width: 50%;
                padding-right: 10px;
            }

            .document_address-client {
                width: 50%;
                padding-left: 10px;
            }
        }

        .document__content {
            position: absolute;
            width: 100%;

            .document__subject {
                position: relative;
                left: -10px;
                width: calc(100% + 20px);

                .document__subject-about {
                    font-weight: 700;
                }
            }

            .document__lines {

                ul {
                    padding: 0;
                    margin: 0;
                }
            }

            .lines_tools {
                position: relative;
                left: calc(100% + 100px);
                display: flex;
                width: 200px;
            }
        }

        .document__total {
            position: absolute;
            width: 100%;

            .document__total-line {
                display: flex;

                .document__total-label {
                    width: 50%;
                }

                .document__total-value {
                    width: 50%;
                    text-align: right;
                }

                &.document__total-line--big {
                    font-weight: 700;

                    .document__total-label {

                    }

                    .document__total-value {

                    }
                }
            }

            .document__footer-text {
                position: relative;
                left: -10px;
                width: calc(100% + 20px);
                text-align: center;
            }
        }



        .document__footer-image {
            position: absolute;

            img {
                width: 100%;
                height: auto;
            }
        }

        .document__official {
            position: absolute;
            width: 100%;
            text-align: center;
        }
    }
</style>


