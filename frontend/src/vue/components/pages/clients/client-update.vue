<script>
    import crudMixin from '@mixins/crud-mixin';
    import clientDetails from './client-details';
    import {Client} from '@models/Client';

    export default {
        name: 'client-update',
        components: {
            clientDetails
        },
        mixins: [crudMixin],
        data() {
            const getItemById = this.$store.getters['clients/getItemById'];
            let id, client;
            id = this.$route.params.id;
            if (id) {
                client = getItemById(id);
                if (client) {
                    return {
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
                return this.client.getFullLabel(this.$root.$options.filters.documentIdFormatter, this.$store.state.settings.clientIdFormat);
            },
            deleteItem: function() {
                this.$_crudMixin_delete(this.client, 'clients', 'clients');
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
                @click="back()"
                class="view-frame__header-button">
                <i class="fas fa-arrow-left"></i>
                <md-tooltip md-delay="300" md-direction="bottom">Back to clients</md-tooltip>
            </div>
            <h1>
                {{getFullLabel()}}
            </h1>
        </div>

        <client-details
            :client="client"
            :auto-save="true"></client-details>

        <div class="view-frame-section">
            <md-button @click="deleteItem()" class="md-primary">Remove Client</md-button>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';
</style>