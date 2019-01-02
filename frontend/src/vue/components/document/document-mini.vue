<script>
    import {Document} from "@models/Document";

    export default {
        name: 'document-mini',
        props: ['document'],
        methods: {
            getDocumentId() {
                return this.document.getFormattedId(this.$root.$options.filters.documentIdFormatter, this.$store.state.settings.all.documentIdFormat);
            },
            openDocument() {
                this.$store.commit('documents/setCurrent', this.document);
                this.$router.push({query: {document: this.document._id}});
                if (this.document.project_id) {
                    this.$store.commit('projects/setCurrentById', this.document.project_id);
                }
            }
        }
    }
</script>


<template>
    <div
        @click="openDocument()"
        :class="['document-mini--' + document.type]"
        class="document-mini">
        <div class="document-mini__icon">
            <i class="fas fa-folder-open"></i>
        </div>
        <div class="document-mini__label">
            {{getDocumentId()}}
        </div>
        <md-tooltip md-delay="500">Open document</md-tooltip>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .document-mini {
        display: flex;
        align-items: center;
        height: 24px;
        margin-right: 4px;
        cursor: pointer;

        &.document-mini--invoice {
            border-bottom: 2px solid $invoice-color-1;
        }

        &.document-mini--quotation {
            border-bottom: 2px solid $quotation-color-1;
        }

        &:hover {
            margin-top: 2px;

            &.document-mini--invoice {
                border-bottom: 4px solid $invoice-color-1;
            }

            &.document-mini--quotation {
                border-bottom: 4px solid $quotation-color-1;
            }
        }


        .document-mini__icon {
            font-size: 12px;
            margin-right: 2px;
            width: 16px;
        }

        .document-mini__label {
            white-space: nowrap;
        }
    }
</style>