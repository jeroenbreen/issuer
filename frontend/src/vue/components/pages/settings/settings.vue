<script>
    import viewModus from '@components/shared/view-modus';

    export default {
        name: 'settings',
        components: {
            viewModus
        },
        data() {
            return {
                settings: {...this.$store.state.settings},
                formats: ['3zeros', 'roman'],
                localState: {
                    compact: this.$store.state.settings.viewModusCompact__overall
                }
            }
        },
        watch: {
            settings: {
                handler: function() {
                    this.settings.standardRate = Number(this.settings.standardRate);
                    this.$store.commit('settings/update', this.settings);
                },
                deep: true
            }
        }
    }
</script>


<template>
    <div class="view-frame view-frame--settings">
        <div class="view-frame-section">
            <h1>
                Settings
            </h1>
        </div>
        <div class="view-frame-section">
            <i>(Settings aren't saved yet)</i>
        </div>
        <div class="view-frame-section">
            <div class="view-frame-section__content">
                <div class="details-row">
                    <md-field>
                        <label>Client numbering</label>
                        <md-select
                            v-model="settings.clientIdFormat"
                            placeholder="Client numbering">
                            <md-option
                                v-for="(format, index) in formats"
                                :value="format"
                                :key="index">{{format}}</md-option>
                        </md-select>
                    </md-field>
                </div>
                <div class="details-row">
                    <md-field>
                        <label>Document numbering</label>
                        <md-select
                            v-model="settings.documentIdFormat"
                            placeholder="Document numbering">
                            <md-option
                                v-for="(format, index) in formats"
                                :value="format"
                                :key="index">{{format}}</md-option>
                        </md-select>
                    </md-field>
                </div>
                <div class="details-row">
                    <md-field>
                        <label>Standard rate</label>
                        <md-input
                            v-model="settings.standardRate"
                            placeholder="Standard rate"
                            type="number"/>
                    </md-field>
                </div>
                <div class="details-row">
                    <md-field>
                        <label>Standard currency</label>
                        <md-input
                                v-model="settings.standardCurrency"
                                placeholder="Standard currency"/>
                    </md-field>
                </div>
                <div class="details-row">
                    <view-modus
                        :state="localState"
                        :type="'overall'"/>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';
</style>
