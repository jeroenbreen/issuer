import Vue from 'vue';
import {pageComponent} from "./page/page";

import {Document} from "../../store/models/Document";
import $ from "jquery";


const documentComponent = Vue.component('document', {
    data(){
        return {
            document: new Document(this.$store.state.documents.current.clone()),
            template: this.$store.getters.template,
            company: this.$store.state.company
        }
    },
    methods: {
        getDocumentId() {
            return this.document.date.getFullYear() + '-' + this.$root.$options.filters.formatId(this.$store.state.settings.documentIdFormat, this.document.documentId);
        },
        closeScreen() {
            this.$store.commit('documents/unsetCurrent');
        },
        getType(index) {
            return index === 0 ? 'front' : 'regular';
        },
        print() {
            const document = this.document.toPrint(this.$root.$options.filters.currency);
            document.documentIdFormatted = this.getDocumentId();
            document.dateFormatted = this.$root.$options.filters.standardDate(this.document.date);
            $.ajax({
                'url': ('print/document/print.php'),
                'type': 'POST',
                'data': JSON.stringify({
                    document: document,
                    template: this.template.clone(),
                    company: {...this.company}
                }),
                'headers': {
                    'Accept': 'application/json'
                }
            }).done(function(response){
                window.open(config.printLocation + response);
            });
        }
    },
    template: `
        <div class="document__container">
            <div class="document">
                <doc-page 
                    v-for="(page, index) in document.pages"
                    v-bind:key="index"
                    v-bind:page="page"
                    v-bind:type="getType(index)"
                    v-bind:document="document"></doc-page>
            </div>
            <div class="document__tools">
                <div class="iss-button" v-on:click="closeScreen()">
                    Back
                </div>
                <div class="iss-button" v-on:click="print()">
                    Print
                </div>
            </div>   
        </div>
    `
});

export {documentComponent}

