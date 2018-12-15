<script>
    import crudMixin from '@mixins/crud-mixin';
    import clientDetails from './client-details';
    import {Client} from '@models/Client';

    export default {
        name: 'client-create',
        components: {
            clientDetails
        },
        mixins: [crudMixin],
        data() {
            const client = new Client();
            client.rate = this.$store.state.settings.standardRate;
            return {
                client: client
            }
        },
        methods: {
            create: function() {
                this.$_crudMixin_create(this.client, 'clients', 'clients');
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
                class="view-frame__header-button"
                @click="back()">
                <i class="fas fa-arrow-left"></i>
                <md-tooltip md-delay="300" md-direction="bottom">Back to clients</md-tooltip>
            </div>
            <h1>
                New Client
            </h1>
        </div>

        <client-details
            :client="client"/>

        <div class="view-frame-section">
            <md-button @click="create()" class="md-primary">Create Client</md-button>
        </div>
    </div>
</template>


<style lang="less"></style>


