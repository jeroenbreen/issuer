<script>
    import {Company} from "@models/Company";

    export default {
        name: 'company',
        methods: {
            update() {
                this.$store.dispatch('updateCompany', this.company.toBackend()).then(() => {
                    console.log('saved');
                });
            }
        },
        computed: {
            company () {
                return new Company(this.$store.state.company.toBackend())
            }
        }
    }

</script>


<template>
    <div class="view-frame view-frame--company" v-scrim>
        <div class="view-frame-section">
            <h1>
                Company
            </h1>
        </div>
        <div class="view-frame-section">
            <div class="view-frame-section__content">
                <div class="details-row">
                    <md-field>
                        <label>Company name</label>
                        <md-input v-model="company.name" placeholder="Company name"></md-input>
                    </md-field>
                </div>
                <div class="details-row">
                    <md-field>
                        <label>Company address</label>
                        <md-input v-model="company.address" placeholder="Company address"></md-input>
                    </md-field>
                </div>
                <div class="details-row">
                    <md-field>
                        <label>Company postcode</label>
                        <md-input v-model="company.postcode" placeholder="Company postcode"></md-input>
                    </md-field>
                </div>
                <div class="details-row">
                    <md-field>
                        <label>Company city</label>
                        <md-input v-model="company.city" placeholder="Company city"></md-input>
                    </md-field>
                </div>
                <div class="details-row">
                    <md-field>
                        <label>Company githubHandle</label>
                        <md-input v-model="company.githubHandle" placeholder="Company githubHandle"></md-input>
                    </md-field>
                </div>
                <div class="details-row">
                    <md-field>
                        <label>Company githubKey</label>
                        <md-input v-model="company.githubKey" placeholder="Company githubKey"></md-input>
                    </md-field>
                </div>
            </div>
        </div>
        <div class="view-frame-section">
            <md-button v-on:click="update()" class="md-primary">Update company details</md-button>
        </div>
    </div>
</template>


<style lang="scss">      @import '@styles/variables.scss';</style>