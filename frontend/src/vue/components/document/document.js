import Vue from 'vue';
import {pageComponent} from "./page/page";

import {Document} from "../../store/models/Document";


const documentComponent = Vue.component('document', {
    data(){
        return {
            document: new Document(this.$store.state.documents.current.clone())
        }
    },
    methods: {
        closeScreen() {
            this.$store.commit('documents/unsetCurrent');
        }
    },
    template: `
        <div class="document__container">
            <div class="document">
                <doc-page 
                    v-for="(page, index) in document.pages"
                    v-bind:key="index"
                    v-bind:page="page"
                    v-bind:document="document"></doc-page>
            </div>
            <div class="document__tools">
                <div class="iss-button" v-on:click="closeScreen()">
                    Back
                </div>
            </div>   
        </div>
    `
});

export {documentComponent}

