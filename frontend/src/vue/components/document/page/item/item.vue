<script>
    import itemDraggable from './item--draggable';
    import itemNonDraggable from './item--non-draggable';
    import {DocumentPropertyHandler} from "./../../document-property-handler";



    export default {
        name: 'item',
        components: {
            itemDraggable, itemNonDraggable
        },
        props: ['template', 'editor', 'factor', 'item', 'onClick', 'page'],
        data() {
            let company = this.$store.state.company;
            let document = this.page.document;
            let page = this.page;
            let documentIdFormatter = this.$root.$options.filters.documentIdFormatter;
            let documentIdFormat = this.$store.state.settings.documentIdFormat;
            let dateFormatter = this.$root.$options.filters.dateFormatter;
            let template = this.template;
            let store = this.$store;
            return {
                documentPropertyHandler: new DocumentPropertyHandler(
                    store, template, company, document, page, documentIdFormatter, documentIdFormat, dateFormatter
                )
            }
        },
        methods: {

        }
    }
</script>


<template>
    <div class="item">
        <item-draggable
            v-if="item.draggable"
            :item="item"
            :editor="editor"
            :factor="factor"
            :template="template"
            :page="page"
            :document-property-handler="documentPropertyHandler"
            :on-click="onClick"/>
        <item-non-draggable
            v-if="!item.draggable"
            :item="item"
            :editor="editor"
            :factor="factor"
            :template="template"
            :page="page"
            :document-property-handler="documentPropertyHandler"/>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

</style>