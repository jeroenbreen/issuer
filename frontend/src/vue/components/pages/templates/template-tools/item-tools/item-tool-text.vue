<script>
    import itemToolTemplateTags from './item-tool-template-tags';
    import _Item from '@models/template/_Item';

    export default {
        name: 'item-tool-text',
        components: {
            itemToolTemplateTags
        },
        props: {
            item: {
                type: _Item,
                required: true
            }
        }
    }
</script>


<template>
    <div class="tool-box__section">
        <item-tool-template-tags
            :item="item"/>
        <textarea v-model="item.content"></textarea>
    </div>
</template>


<style lang="scss" scoped>
    textarea {
        width: 100%;
        height: 100px;
        border: 0;
        padding: 4px;
        background: #ddd;
        font-family: inherit;
        outline: none;
    }
</style>