<script>
    import autoSaver from '@components/shared/auto-saver';
    import {Company} from "@models/Company";

    export default {
        name: 'company',
        components: {
            autoSaver
        },
        data() {
            return {
                company: new Company(this.$store.state.company.toBackend())
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
            <div class="view-frame-section__header">
                Address
            </div>
            <div class="view-frame-section__content">
                <div class="details-row">
                    <md-field>
                        <label>Company name</label>
                        <md-input v-model="company.name" placeholder="Company name"/>
                    </md-field>
                </div>
                <div class="details-row">
                    <md-field>
                        <label>Company address</label>
                        <md-input v-model="company.address" placeholder="Company address"/>
                    </md-field>
                </div>
                <div class="details-row">
                    <md-field>
                        <label>Company postcode</label>
                        <md-input v-model="company.postcode" placeholder="Company postcode"/>
                    </md-field>
                </div>
                <div class="details-row">
                    <md-field>
                        <label>Company city</label>
                        <md-input v-model="company.city" placeholder="Company city"/>
                    </md-field>
                </div>
            </div>
        </div>

        <div class="view-frame-section">
            <div class="view-frame-section__header">
                Financial
            </div>
            <div class="view-frame-section__content">
                <div class="details-row">
                    <md-field>
                        <label>Bank account</label>
                        <md-input v-model="company.bank" placeholder="Bank account"/>
                    </md-field>
                </div>
                <div class="details-row">
                    <md-field>
                        <label>Chamber of Commerce</label>
                        <md-input v-model="company.coc" placeholder="Chamber of Commerce"/>
                    </md-field>
                </div>
                <div class="details-row">
                    <md-field>
                        <label>VAT number</label>
                        <md-input v-model="company.vat" placeholder="VAT number"/>
                    </md-field>
                </div>
            </div>
        </div>

        <auto-saver
            :watch="company"
            :store-module="'updateCompany'"/>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';
</style>