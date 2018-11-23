<script>
    import item from "./page/item/item";
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
                return (item.page === 'all' || item.page === this.page.getType()) || (item.type === 'total' && this.page.showTotal());
            }
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

            <!-- page.lines container -->
            <vue-drag-resize
                @resizing="resizeLinesContainer"
                @dragging="dragLinesContainer"
                container=".document__elements"
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
                :page="page"/>

        </div>




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
    }
</style>


