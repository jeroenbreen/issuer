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
                    client: new Client(client)
                }
            } else {
                return null;
            }
        } else {
            return null;
        }
    },
    methods: {
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
            <h1>
                {{currentClient.getFullLabel()}}
            </h1>
            <client-detail v-bind:client="client"></client-detail>
            
            <div class="iss-button iss-button--alert" v-on:click="deleteItem()">
                Remove Client
            </div>
            
            <hr>
          
            
            <div class="iss-button" v-on:click="update()">
                Update Client
            </div>
            <div class="iss-button" v-on:click="back()">
                Back
            </div>
        </div>
    `
});

export {clientUpdateComponent}

