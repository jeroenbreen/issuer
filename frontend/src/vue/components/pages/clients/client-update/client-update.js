import Vue from 'vue';
import {clientDetailsComponent} from './../client-details/client-details';
import {Client} from './../../../../store/models/Client';


const clientUpdateComponent = Vue.component('client-update', {
    data() {
        const getItemById = this.$store.getters['clients/getItemById'];
        let id, client;
        id = this.$route.params.id;
        if (id) {
            client = getItemById(id);
            if (client) {
                return {
                    currentClient: client,
                    client: new Client(client.toBackend())
                }
            } else {
                return null;
            }
        } else {
            return null;
        }
    },
    methods: {
        getFullLabel: function() {
            return this.currentClient.getFullLabel(this.$root.$options.filters.formatId, this.$store.state.settings.clientIdFormat);
        },
        update: function() {
            this.$store.dispatch('clients/update', this.client).then(() => {
                this.$router.push({path: '/clients'});
            });
        },
        deleteItem: function() {
            this.$store.dispatch('clients/delete', this.currentClient).then(() => {
                this.$router.push({path: '/clients'});
            });
        },
        back: function() {
            this.$router.push('/clients');
        }
    },
    template: `
        <div class="view-frame view-frame--client-update">
            <div class="view-frame__header">
                <div 
                    v-on:click="back()"
                    class="view-frame__header-button">
                    <i class="fas fa-arrow-left"></i>
                </div>
                <h1>
                    {{getFullLabel()}}
                </h1>
            </div>

            <client-detail v-bind:client="client"></client-detail>
            
            <div class="view-frame-section">
                <md-button v-on:click="update()" class="md-primary">Update Client</md-button>
                <md-button v-on:click="deleteItem()" class="md-primary">Remove Client</md-button>
            </div>
        </div>
    `
});

export {clientUpdateComponent}

