<script>
    import clientDetails from './client-details';
    import {Client} from '@models/Client';

    export default {
        name: 'client-update',
        components: {
            clientDetails
        },
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
        }
    }
</script>


<template>
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

        <client-details v-bind:client="client"></client-details>

        <div class="view-frame-section">
            <md-button v-on:click="update()" class="md-primary">Update Client</md-button>
            <md-button v-on:click="deleteItem()" class="md-primary">Remove Client</md-button>
        </div>
    </div>
</template>


<style lang="scss">      @import '@styles/variables.scss';</style>