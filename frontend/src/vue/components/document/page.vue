<script>
    import item from "./page/item";
    import docLine from "./page/line";
    import sortableList from "@components/shared/sortable-list";
    import vueDragResize from '@components/shared/vue-drag-resize/vue-drag-resize'
    import $ from 'jquery'

    import {Template} from "@models/Template";


    let saveBuffer = null;

    export default {
        name: 'doc-page',
        components: {
            item, docLine, sortableList, vueDragResize
        },
        props: ['page', 'template', 'editor', 'factor', 'tools'],
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
                return this.page.document.getFormattedId(this.$root.$options.filters.documentIdFormatter, this.$store.state.settings.documentIdFormat);
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
                    this.$store.commit('templateEditor/setCurrentItemIndex', this.template.items.indexOf(item));
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
            },
            resizeLinesContainer(event) {
                this.template[this.page.getType()].lines.y = event.top;
                this.template[this.page.getType()].lines.height = event.height;
            },
            dragLinesContainer(event) {
                this.template[this.page.getType()].lines.y = event.top;
            },
            showCustomItem(item) {
                return item.page === 'all' || item.page === this.page.getType();
            },
            getTotalTop() {
                let pageTemplateSettings = this.template[this.page.getType()];
                return this.scale(pageTemplateSettings.lines.y + pageTemplateSettings.lines.height - 60);
            },
        }
    }
</script>


<template>
    <div
        :style="{'font-size': scale(10) + 'px', 'width': scale(620) + 'px', 'height': scale(877) + 'px'}"
        :class="{'template--active': editor}"
        class="page">

        <div class="document__elements"
             :style="{'left': scale(template.margin.left) + 'px',
                   'top': scale(template.margin.top) + 'px',
                   'right': scale(template.margin.right) + 'px ',
                   'bottom': scale(template.margin.bottom) + 'px'}">



            <div
                class="document__content"
                :class="{'document__content--on-top': !editor}"
                :style="{'top': scale(template[page.getType()].lines.y) + 'px',
                         'height': scale(template[page.getType()].lines.height) + 'px'}">


                <div
                    :style="{'padding': scale(10) + 'px 0'}"
                    class="document__lines">
                    <sortable-list
                        lockAxis="y"
                        :useDragHandle="true"
                        v-model="page.lines"
                        @sortStart="onSortStart($event)"
                        @sortEnd="onSortEnd($event)">
                        <doc-line
                            v-for="(line, index) in page.lines"
                            :index="index"
                            :key="index"
                            :line="line"
                            :tools="tools"
                            :scale="scale"/>
                    </sortable-list>
                </div>
            </div>

            <div class="document__total"
                 v-if="page.showTotal()"
                 :style="{'top': getTotalTop() + 'px'}">
                <div
                    :style="{'height': scale(20) + 'px'}"
                    class="document__total-line">
                    <div class="document__total-label">
                        Totaal
                    </div>
                    <div class="document__total-value">
                        {{page.document.getTotal() | currency}} {{page.document.currency}}
                    </div>
                </div>
                <div
                    :style="{'height': scale(20) + 'px'}"
                    class="document__total-line">
                    <div class="document__total-label">
                        BTW 21%
                    </div>
                    <div class="document__total-value">
                        {{page.document.getTotal() * 0.21 | currency}} {{page.document.currency}}
                    </div>
                </div>
                <div
                        :style="{'font-size': scale(15) + 'px', 'line-height': scale(16) + 'px', 'height': scale(20) + 'px'}"
                        class="document__total-line document__total-line--big">
                    <div class="document__total-label">
                        Te betalen
                    </div>
                    <div class="document__total-value">
                        {{page.document.getTotal() * 1.21 | currency}} {{page.document.currency}}
                    </div>
                </div>
            </div>

            <!-- page.lines container -->
            <vue-drag-resize
                @resizing="resizeLinesContainer"
                @dragging="dragLinesContainer"
                :preventActiveBehavior="!editor"
                :parentLimitation="true"
                :isDraggable="editor"
                :isResizable="editor"
                :y="scale(template[page.getType()].lines.y)"
                :x="0"
                :h="scale(template[page.getType()].lines.height)"
                :minh="100"
                :w="scale(template.getElementAreaWidth())"
                :sticks="['tm','bm']"/>

            <!-- custom items -->
            <item
                v-for="(item, index) in template.items"
                v-if="showCustomItem(item)"
                :on-click="selectItem"
                :key="index"
                :item="item"
                :editor="editor"
                :factor="factor"
                :template="template"
                :document="page.document"
                :page="page"/>

        </div>

        <vue-drag-resize
            v-if="editor && page.getType() === 'front'"
            class="iss-resizer iss-resizer--hor"
            @dragging="setMarginTop"
            :parentLimitation="true"
            :axis="'y'"
            :isDraggable="editor"
            :isResizable="false"
            :y="scale(template.margin.top)"
            :x="scale(template.margin.left)"
            :h="1"
            :minh="1"
            :w="scale(620 - template.margin.left - template.margin.right)"/>

        <vue-drag-resize
            v-if="editor && page.getType() === 'front'"
            class="iss-resizer iss-resizer--hor"
            @dragging="setMarginBottom"
            :parentLimitation="true"
            :axis="'y'"
            :isDraggable="editor"
            :isResizable="false"
            :y="scale(877 - template.margin.top)"
            :x="scale(template.margin.left)"
            :h="1"
            :minh="1"
            :w="scale(620 - template.margin.left - template.margin.right)"/>

        <vue-drag-resize
            v-if="editor && page.getType() === 'front'"
            class="iss-resizer iss-resizer--ver"
            @dragging="setMarginLeft"
            :parentLimitation="true"
            :axis="'x'"
            :isDraggable="editor"
            :isResizable="false"
            :y="scale(template.margin.top)"
            :x="scale(template.margin.left)"
            :w="1"
            :minw="1"
            :h="scale(877 - template.margin.top - template.margin.bottom)"/>

        <vue-drag-resize
            v-if="editor && page.getType() === 'front'"
            class="iss-resizer iss-resizer--ver"
            @dragging="setMarginRight"
            :parentLimitation="true"
            :axis="'x'"
            :isDraggable="editor"
            :isResizable="false"
            :y="scale(template.margin.top)"
            :x="scale(620 - template.margin.right)"
            :w="1"
            :minw="1"
            :h="scale(877 - template.margin.top - template.margin.bottom)"/>


        <md-snackbar
            :md-position="'left'"
            :md-duration="2000"
            :md-active.sync="localState.showSnackbar" md-persistent>
            <span>Saved...</span>
        </md-snackbar>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';


    .page {
        background: #fff;
        position: relative;
        line-height: 1.6;
    }

    .document__elements {
        position: absolute;

        .document__content {
            position: absolute;
            width: 100%;
            left: 0;

            &.document__content--on-top {
                z-index: 10;
            }

            .document__lines {

                ul {
                    padding: 0;
                    margin: 0;
                }
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
    }
</style>


