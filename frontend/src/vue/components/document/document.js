import Vue from 'vue';
import {SortableList} from "./../shared/sortable/sortableList";

import {pageComponent} from "./../shared/page/page";
import {miniPageComponent} from "./mini-page/mini-page";

import {Document} from "../../store/models/Document";
import $ from "jquery";

const pageHeight = 877 + 40;
const scrollBuffer = 20;
let saveBuffer = null;


const documentComponent = Vue.component('document', {
    mounted () {
        const container = $('.document__container');
        const document = this.document;
        container.scroll(function(event){
            let scroll = container.scrollTop(),
                pageIndex = Math.floor((scroll + scrollBuffer) / pageHeight);
            document.state.currentPage = document.pages[pageIndex];

        })
    },
    data(){
        return {
            document: new Document(this.$store.state.documents.current.clone()),
            template: this.$store.getters.template,
            company: this.$store.state.company,
            localState: {
                showSnackbar: false
            }
        }
    },
    watch: {
        document: {
            handler: function() {
                // todo document.state should either be excluded from the watch
                // or be stored in the database
                if (saveBuffer) {
                    clearTimeout(saveBuffer);
                }
                saveBuffer = setTimeout(() => {
                    this.$store.dispatch('documents/update', this.document.toBackend()).then(() => {
                        this.localState.showSnackbar = true;
                        console.log('saved...');
                    });
                }, 500)
            },
            deep: true
        }
    },
    methods: {
        deleteDocument() {
            // use the current document for deleting, since this.document is a clone of it
            this.$store.dispatch('documents/delete', this.$store.state.documents.current).then(() => {
                this.closeScreen();
            });
        },
        getDocumentId() {
            return this.document.getFormattedId(this.$root.$options.filters.formatId, this.$store.state.settings.documentIdFormat);
        },
        closeScreen() {
            this.$store.commit('documents/unsetCurrent');
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
                scrollTop: event.newIndex * (pageHeight) - scrollBuffer
            }, 1000);
        }
    },
    template: `
        <div class="cover">
            <div class="document" v-bind:class="{'document--locked': document.locked}">
                <doc-page 
                    v-for="(page, index) in document.pages"
                    v-bind:key="index"
                    v-bind:page="page"
                    v-bind:template="template"
                    v-bind:editor="false"
                    v-bind:factor="1"
                    v-bind:tools="true"></doc-page>
                <div v-if="!document.locked" class="page__tools">
                    <div 
                        v-on:click="createPage()" 
                        class="icon-button icon-button--editing-mode">
                        <div class="icon-button__icon">
                            <i class="fas fa-plus"></i>   
                        </div>
                    </div>
                </div>
            </div>
            <div
                v-if="document.pages.length > 1"
                class="document__index">
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

                <div class="tool-button tool-button--inverse" v-on:click="print()">
                    <div class="tool-button__icon">
                        <i class="fas fa-print"></i>
                    </div>
                    <div class="tool-button__label">
                        Print
                    </div>
                </div>
                
                <div class="tool-button tool-button--inverse tool-button--warning" v-on:click="deleteDocument()">
                    <div class="tool-button__icon">
                        <i class="fas fa-trash"></i>
                    </div>
                    <div class="tool-button__label">
                        Remove
                    </div>
                </div>
            </div>  
            
            <md-snackbar :md-position="'left'" :md-duration="2000" :md-active.sync="localState.showSnackbar" md-persistent>
                <span>Saved...</span>
            </md-snackbar> 
            
            <div class="document__close" v-on:click="closeScreen()"></div>
            
            <div class="document__mode">
                <md-switch v-model="document.locked">Locked</md-switch>
            </div>
        </div>
    `
});

export {documentComponent}

