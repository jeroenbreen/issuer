<script>
    import {Document} from "@models/Document";

    export default {
        name: 'document-mini',
        props: ['document'],
        methods: {
            getDocumentId() {
                return this.document.getFormattedId(this.$root.$options.filters.formatId, this.$store.state.settings.documentIdFormat);
            },
            openDocument() {
                this.$store.commit('documents/setCurrent', this.document);
                this.$router.push({query: {document: this.document._id}})
            }
        }
    }
</script>


<template>
    <div
        @click="openDocument()"
        class="document-mini">
        <div class="document-mini__icon">
            <i class="fas fa-folder-open"></i>
        </div>
        <div class="document-mini__label">
            {{getDocumentId()}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .document-mini {
        display: flex;
        background: $blue;
        height: 26px;
        border-radius: 13px;
        padding: 0 12px;
        align-items: center;
        margin: 0 3px 3px 0;
        cursor: pointer;

        &:hover {
             box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
         }

        .document-mini__icon {
            font-size: 12px;
            margin-right: 6px;
            width: 16px;
        }

        .document-mini__label {

        }
    }
</style>