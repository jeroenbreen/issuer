<script>
    import clientCard from './client-card';
    import searchBox from '@components/layout/search-box';
    import viewModus from '@components/shared/view-modus';


    export default {
        name: 'clients-page',
        components: {
            clientCard, searchBox, viewModus
        },
        data() {
            return {
                search: {
                    label: 'Search clients',
                    value: ''
                },
                localState: {
                    compact: this.$store.state.settings.all.viewModusCompact__clients
                }
            }
        },
        computed: {
            clients() {
                return this.$store.state.clients.all.filter(client => {
                    let value = this.search.value.toLocaleLowerCase();
                    return client.companyName.toLowerCase().indexOf(value) > -1 ||
                        client.contactFirstName.toLowerCase().indexOf(value) > -1 ||
                        client.contactLastName.toLowerCase().indexOf(value) > -1;
                });
            }
        },
        methods: {
            create: function() {
                this.$router.push('clients/new');
            }
        }
    }
</script>


<template>
    <div
        :class="{'clients--compact': localState.compact}"
        class="view-frame view-frame--clients">
        <div class="view-frame-section">
            <h1>
                Clients
            </h1>
        </div>
        <div class="view-frame-section">
            <div class="view-frame-tools">
                <search-box
                        :search-data="search"/>

                <view-modus
                        :state="localState"
                        :type="'clients'"/>
            </div>
        </div>
        <div class="view-frame-section">
            <md-button @click="create()" class="md-primary">Create Client</md-button>
        </div>
        <div class="view-frame-section">
            <div class="client-cards">
                <client-card
                    v-for="client in clients"
                    :key="client._id"
                    :client="client"/>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .client-cards {
        margin-bottom: 20px;
    }
</style>