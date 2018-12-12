<script>
    import autoSaver from '@components/shared/auto-saver';
    import Client from '@models/Client';

    export default {
        name: 'client-details',
        components: {
            autoSaver
        },
        props: {
            client: {
                type: Client,
                required: true
            },
            autoSave: {
                type: Boolean,
                required: false,
                default: false
            }
        }
    }
</script>


<template>
    <div class="view-frame-section">
        <div class="view-frame-section__content">
            <div class="details-row">
                <md-field>
                    <label>Company Name</label>
                    <md-input v-model="client.companyName" placeholder="Company Name"/>
                </md-field>
            </div>
            <div class="details-row">
                <md-field>
                    <label>Contact First Name</label>
                    <md-input v-model="client.contactFirstName" placeholder="Contact First Name"/>
                </md-field>
            </div>
            <div class="details-row">
                <md-field>
                    <label>Contact Last Name</label>
                    <md-input v-model="client.contactLastName" placeholder="Contact Last Name"/>
                </md-field>
            </div>
            <div class="details-row">
                <md-field>
                    <label>Street</label>
                    <md-input v-model="client.street" placeholder="Street"/>
                </md-field>
            </div>
            <div class="details-row">
                <md-field>
                    <label>Postcode</label>
                    <md-input v-model="client.postcode" placeholder="Postcode"/>
                </md-field>
            </div>
            <div class="details-row">
                <md-field>
                    <label>City</label>
                    <md-input v-model="client.city" placeholder="City"/>
                </md-field>
            </div>
            <div class="details-row">
                <md-field>
                    <label>Email</label>
                    <md-input v-model="client.email" placeholder="Email"/>
                </md-field>
            </div>
            <div class="details-row">
                <md-field>
                    <label>Telephone</label>
                    <md-input v-model="client.telephone" placeholder="Telephone"/>
                </md-field>
            </div>
            <div class="details-row">
                <md-field>
                    <label>Homepage</label>
                    <md-input v-model="client.homepage" placeholder="Homepage"/>
                </md-field>
            </div>
            <div class="details-row">
                <md-field>
                    <label>Rate</label>
                    <md-input v-model="client.rate" placeholder="Rate" type="number"/>
                </md-field>
            </div>
        </div>

        <auto-saver
                v-if="autoSave"
                :watch="client"
                :store-module="'clients/update'"/>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';
</style>