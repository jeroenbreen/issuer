import Vue from 'vue';
import {clientDetailsComponent} from './../client-details/client-details';
import {Client} from './../../../../store/models/Client';


const clientCreateComponent = Vue.component('client-create', {
    data() {
        return {
            client: new Client()
        }
    },
    methods: {
        create: function() {
            this.$store.dispatch('clients/create', this.client).then(() => {
                this.$router.push({path: '/clients'});
            });
        },
        back: function() {
            this.$router.push('/clients');
        }
    },
    template: `
        <div class="view-frame view-frame--client-create">
            <div class="view-frame__header">
                <div 
                    v-on:click="back()"
                    class="view-frame__header-button">
                    <i class="fas fa-arrow-left"></i>
                </div>
                <h1>
                    New Client
                </h1>
            </div>
            
            <client-detail v-bind:client="client"></client-detail>
            
            <div class="view-frame-section">
                <md-button v-on:click="create()" class="md-primary">Create Client</md-button>
            </div>
        </div>
    `
});

export {clientCreateComponent}

