import Vue from 'vue';
import {Document} from "../../store/models/Document";
import theStore from "../../store";

const documentComponent = Vue.component('document', {
    methods: {
        getYear() {
            return this.document.date.getFullYear();
        },
        closeScreen() {
            this.$store.commit('documents/unsetCurrent');
        }
    },
    computed: {
        settings() {
            return this.$store.state.settings.document;
        },
        company() {
            return this.$store.state.company;
        },
        document() {
            return this.$store.state.documents.current;
        }
    },
    template: `
        <div class="document__container">
            <div class="document"
                v-bind:style="{'padding': settings.margin.top + 'px ' + settings.margin.right + 'px ' + settings.margin.bottom + 'px ' + settings.margin.left + 'px'}">
                
                <div class="document__elements">
                    <div class="document__logo" 
                        v-bind:style="{'left': settings.logo.left + 'px', 
                                       'top': settings.logo.top + 'px'}">
                        <img v-bind:src="settings.logo.src" v-bind:width="settings.logo.width">
                    </div>
                    
                    <div class="document__info">
                        <div class="document__">
                            <b>{{settings.library.invoice}}</b> {{getYear()}} 
                        </div>
                        <div class="document__date">
                            {{document.date | standardDate}}
                        </div>
                    </div>
                    
                    <div class="document__addresses"
                        v-bind:style="{'top': settings.addresses.top + 'px',
                                       'border-top': settings.addresses.borderTop + 'px solid #000'}">
                        <div class="document_address-own">
                            <b>{{company.name}}</b><br>
                            {{document.userName}}<br>
                            {{company.address}}<br>
                            {{company.postcode}} {{company.city}}
                        </div>
                        <div class="document_address-client">
                            <b>{{document.clientCompanyName}}</b><br>
                            {{document.clientContactName}}<br>
                            {{document.clientStreet}}<br>
                            {{document.clientPostcode}} {{company.clientCity}}
                        </div>
                    </div>
                </div>
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

