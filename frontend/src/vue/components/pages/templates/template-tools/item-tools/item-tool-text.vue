<script>
    export default {
        name: 'item-tool-text',
        props: ['item'],
        methods: {

        }
    }
</script>


<template>
    <div class="tool-box__section">
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