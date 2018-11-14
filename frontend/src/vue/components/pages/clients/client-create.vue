<script>
    import clientDetails from './client-details';
    import {Client} from '@models/Client';

    export default {
        name: 'client-create',
        components: {
            clientDetails
        },
        data() {
            const client = new Client();
            client.rate = this.$store.state.settings.standardRate;
            return {
                client: client
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
        }
    }
</script>


<template>
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

        <client-details v-bind:client="client"></client-details>

        <div class="view-frame-section">
            <md-button v-on:click="create()" class="md-primary">Create Client</md-button>
        </div>
    </div>
</template>


<script lang="less"></script>


