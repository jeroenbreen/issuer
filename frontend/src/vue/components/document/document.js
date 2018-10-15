import Vue from 'vue';
import {SortableList} from "./../shared/sortable/sortableList";

import {pageComponent} from "./page/page";
import {miniPageComponent} from "./mini-page/mini-page";

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
        createPage() {
            this.document.createPage();
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
        },
        onSortEnd(event) {
            $('.document__container').animate({
                scrollTop: event.newIndex * (877 + 30)
            }, 1000);
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
                <div class="page__tools">
                    <div 
                        v-on:click="createPage()" 
                        class="icon-button icon-button--editing-mode">
                        <div class="icon-button__icon">
                            <i class="fas fa-plus"></i>   
                        </div>
                    </div>
                </div>
            </div>
            <div class="document__index">
                <SortableList 
                    lockAxis="y" 
                    v-model="document.pages"
                    v-on:sortEnd="onSortEnd($event)">
                    <mini-page 
                        v-for="(page, index) in document.pages" 
                        v-bind:index="index" 
                        v-bind:key="index" 
                        v-bind:page="page"></mini-page>
                </SortableList>
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

