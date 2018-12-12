<script>
    import templateTag from './tags/template-tag'
    import {DocumentPropertyHandler} from "@tools/document-properties/document-property-handler";
    import _Item from '@models/template/_Item';



    export default {
        name: 'item-tool-template-tags',
        components: {
            templateTag
        },
        props: {
            item: {
                type: _Item,
                required: true
            }
        },
        data() {
            let documentPropertyHandler = new DocumentPropertyHandler();
            return {
                sections: documentPropertyHandler.getAll()
            }
        }
    }
</script>


<template>
    <div class="template-tags">
        <div
            v-for="section in sections"
            class="template-tags__section">
            <template-tag
                v-for="(tag,id) in section.items"
                :key="id"
                :tag="tag"
                :item="item"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .template-tags {
        display: flex;
        flex-wrap: wrap;

        .template-tags__section {
            display: flex;
            flex-wrap: wrap;
        }
    }
</style>