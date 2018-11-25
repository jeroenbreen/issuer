<script>
    import item from "./page/item/item";
    import {pageHeight, pageWidth} from '@root/globals';
    import {Template} from "@models/Template";




    let saveBuffer = null;

    export default {
        name: 'doc-page',
        components: {
            item
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
                pageHeight: pageHeight,
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

            // template
            selectItem(item) {
                if (this.editor) {
                    this.$store.commit('templateEditor/setCurrentItemIndex', this.template.items.indexOf(item));
                }
            },
            showCustomItem(item) {
                return (item.page === 'all' || item.page === this.page.getType()) || (item.type === 'total' && this.page.showTotal());
            },
            isCurrentItem(item) {
                return this.$store.state.templateEditor.currentItemIndex === this.template.items.indexOf(item);
            }
        }
    }
</script>


<template>
    <div
        :style="{'font-size': scale(10) + 'px', 'width': scale(620) + 'px', 'height': scale(pageHeight) + 'px'}"
        :class="{'template--active': editor}"
        class="page">

        <div class="document__items"
             :style="{'left': scale(template.margin.left) + 'px',
                   'top': scale(template.margin.top) + 'px',
                   'right': scale(template.margin.right) + 'px ',
                   'bottom': scale(template.margin.bottom) + 'px'}">

            <item
                v-for="(item, index) in template.items"
                v-if="showCustomItem(item)"
                :class="{'item--current': isCurrentItem(item)}"
                :on-click="selectItem"
                :key="index"
                :item="item"
                :editor="editor"
                :tools="tools"
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

        .document__items {
            position: absolute;
        }
    }
</style>


