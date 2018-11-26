<script>
    import imageUploader from '@components/pages/templates/template-tools/image-uploader';

    export default {
        name: 'item-image',
        components: {
            imageUploader
        },
        props: ['item', 'editor', 'template']
    }
</script>


<template>
    <div class="item__image">
        <img :src="item.getSrc()">

        <image-uploader
                v-if="editor"
                :item="item"
                :template="template"/>
    </div>
</template>


<style lang="scss">
    .item__border {
        height: 100%;
    }
</style>