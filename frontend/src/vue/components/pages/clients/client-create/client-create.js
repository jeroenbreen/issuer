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
            <h1>
                New Client
            </h1>
            <client-detail v-bind:client="client"></client-detail>
               
            <div class="iss-button" v-on:click="create()">
                Create Client
            </div>
            <div class="iss-button" v-on:click="back()">
                Back
            </div>
        </div>
    `
});

export {clientCreateComponent}

