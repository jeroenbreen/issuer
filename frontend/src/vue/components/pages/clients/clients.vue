<script>
    import clientCard from './client-card';

    export default {
        name: 'clients-page',
        components: {
            clientCard
        },
        methods: {
            getAll: function(){
                return this.$store.state.clients.all;
            },
            create: function() {
                this.$router.push('clients/new');
            }
        }
    }

</script>


<template>
    <div class="view-frame view-frame--clients">
        <div class="view-frame-section">
            <h1>
                Clients
            </h1>
        </div>
        <div class="view-frame-section">
            <div class="client-cards">
                <client-card
                        v-for="client in getAll()"
                        v-bind:key="client._id"
                        v-bind:client="client"></client-card>
            </div>
        </div>
        <div class="view-frame-section">
            <md-button v-on:click="create()" class="md-primary">Create Client</md-button>
        </div>
    </div>
</template>


<style lang="scss">      @import '@styles/variables.scss';
    .client-cards {
        margin-bottom: 20px;
    }
</style>