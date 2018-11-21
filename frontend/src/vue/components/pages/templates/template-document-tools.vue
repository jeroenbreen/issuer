<script>
    import templateMargins from "./template-margins";


    export default {
        name: 'template-document-tools',
        props: ['template'],
        components: {
            templateMargins
        },
        methods: {


        }
    }
</script>


<template>
    <div class="template-document-tools tool-box">
        <div class="tool-box__header">
            Document
        </div>
        <div class="tool-box__section">
            <div class="template-document-tools__title">
                <md-field>
                    <label>Title</label>
                    <md-input v-model="template.title" placeholder="Title"/>
                </md-field>
            </div>
        </div>
        <div class="tool-box__section">
            <template-margins
                :template="template"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .template-document-tools {

    }
</style>