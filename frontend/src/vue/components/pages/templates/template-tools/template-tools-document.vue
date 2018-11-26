<script>
    import templateMargins from "./template-margins";

    import {Template} from "@models/Template";

    export default {
        name: 'template-tools-document',
        props: {
            template: {
                type: Template,
                required: true
            }
        },
        components: {
            templateMargins
        }
    }
</script>


<template>
    <div class="tool-box">
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
</style>