import Vue from 'vue';
import {Document} from "../../store/models/Document";


const documentMiniComponent = Vue.component('document-mini', {
    props: ['document'],
    methods: {
        getDocumentId() {
            return this.document.getFormattedId(this.$root.$options.filters.formatId, this.$store.state.settings.documentIdFormat);
        },
        openDocument() {
            this.$store.commit('documents/setCurrent', new Document(this.document.toBackend()));
        }
    },
    template: `
        <div 
            v-on:click="openDocument()"
            class="document-mini">
            <div class="document-mini__icon document-mini__icon--normal">
                <i class="fas fa-folder"></i>
            </div>
            <div class="document-mini__icon document-mini__icon--hover">
                <i class="fas fa-folder-open"></i>
            </div>
            <div class="document-mini__label">
                {{getDocumentId()}}
            </div>
        </div>
    `
});

export {documentMiniComponent}