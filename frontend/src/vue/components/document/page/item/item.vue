<script>
    import itemDraggable from './item--draggable';
    import itemNonDraggable from './item--non-draggable';
    import {DocumentPropertyHandler} from "@tools/document-properties/document-property-handler";



    export default {
        name: 'item',
        components: {
            itemDraggable, itemNonDraggable
        },
        props: ['template', 'editor', 'tools', 'factor', 'item', 'onClick', 'page'],
        data() {
            let company = this.$store.state.company;
            let document = this.page.document;
            let page = this.page;
            let documentIdFormatter = this.$root.$options.filters.documentIdFormatter;
            let documentIdFormat = this.$store.state.settings.all.documentIdFormat;
            let dateFormatter = this.$root.$options.filters.dateFormatter;
            let template = this.template;
            let store = this.$store;
            let documentPropertyHandler = new DocumentPropertyHandler();
            documentPropertyHandler.attachedContent(store, template, company, document, page, documentIdFormatter, documentIdFormat, dateFormatter);
            return {
                documentPropertyHandler: documentPropertyHandler
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
            :tools="tools"
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