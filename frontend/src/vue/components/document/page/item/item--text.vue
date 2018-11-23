<script>
    import contentParser from './../content-parser';

    export default {
        name: 'item-text',
        props: ['item', 'editor', 'documentPropertyHandler'],
        methods: {
            getContent() {
                return contentParser.parse(this.item.content, this.documentPropertyHandler);
            },
        }
    }
</script>


<template>
    <div class="item__text">
        <textarea
            v-if="editor"
            v-model="item.content"
            :style="{'text-align': item.textAlign}"></textarea>

        <div
            v-if="!editor"
            v-html="getContent()"
            :style="{'text-align': item.textAlign}"></div>
    </div>

</template>


<style lang="scss">
    .item__content {

        div,
        textarea {
            width: 100%;
            height: 100%;
            border: 0;
            background: transparent;
            padding: 0;
            margin: 0;
            resize: none;
            font-family: inherit;
            font-size: inherit;
            outline: none;
        }
    }
</style>