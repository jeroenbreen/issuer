import Vue from 'vue';
import {clientCardComponent} from './client-card/client-card';



const clientsComponent = Vue.component('employees', {
    methods: {
        getAll: function(){
            return this.$store.state.clients.all;
        },
        create: function() {
            this.$router.push('clients/new');
        }
    },
    template: `
        <div class="page page--clients">
            <h1>
            Clients
            </h1>
            <div class="client-cards">
                <client-card 
                    v-for="client in getAll()" 
                    v-bind:key="client._id"
                    v-bind:client="client"></client-card>
            </div>
            
            <div class="iss-button" v-on:click="create()">
                Create Client
            </div>
        </div>
    `
});

export {clientsComponent}