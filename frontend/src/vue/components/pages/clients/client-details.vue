<script>
    export default {
        name: 'client-details',
        props: ['client']
    }
</script>


<template>
    <div class="view-frame-section">
        <div class="view-frame-section__content">
            <div class="details-row">
                <md-field>
                    <label>Company Name</label>
                    <md-input v-model="client.companyName" placeholder="Company Name"></md-input>
                </md-field>
            </div>
            <div class="details-row">
                <md-field>
                    <label>Contact First Name</label>
                    <md-input v-model="client.contactFirstName" placeholder="Contact First Name"></md-input>
                </md-field>
            </div>
            <div class="details-row">
                <md-field>
                    <label>Contact Last Name</label>
                    <md-input v-model="client.contactLastName" placeholder="Contact Last Name"></md-input>
                </md-field>
            </div>
            <div class="details-row">
                <md-field>
                    <label>Street</label>
                    <md-input v-model="client.street" placeholder="Street"></md-input>
                </md-field>
            </div>
            <div class="details-row">
                <md-field>
                    <label>Postcode</label>
                    <md-input v-model="client.postcode" placeholder="Postcode"></md-input>
                </md-field>
            </div>
            <div class="details-row">
                <md-field>
                    <label>City</label>
                    <md-input v-model="client.city" placeholder="City"></md-input>
                </md-field>
            </div>
            <div class="details-row">
                <md-field>
                    <label>Email</label>
                    <md-input v-model="client.email" placeholder="Email"></md-input>
                </md-field>
            </div>
            <div class="details-row">
                <md-field>
                    <label>Telephone</label>
                    <md-input v-model="client.telephone" placeholder="Telephone"></md-input>
                </md-field>
            </div>
            <div class="details-row">
                <md-field>
                    <label>Homepage</label>
                    <md-input v-model="client.homepage" placeholder="Homepage"></md-input>
                </md-field>
            </div>
            <div class="details-row">
                <md-field>
                    <label>Rate</label>
                    <md-input v-model="client.rate" placeholder="Rate" type="number"></md-input>
                </md-field>
            </div>
        </div>
    </div>
</template>


<style lang="scss">      @import '@styles/variables.scss';</style>