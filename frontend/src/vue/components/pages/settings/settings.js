import Vue from 'vue';


const settingsComponent = Vue.component('settings', {
    methods: {
        getFormats() {
            return [
                '3zeros'
            ];
        }
    },
    data() {
        return {
            settings: {...this.$store.state.settings}
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
    },
    template: `
        <div class="view-frame view-frame--settings">
            <div class="view-frame-section">
                <h1>
                    Settings
                </h1>
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
                                        v-for="(format, index) in getFormats()" 
                                        v-bind:value="format"
                                        v-bind:key="index">{{format}}</md-option> 
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
                                        v-for="(format, index) in getFormats()" 
                                        v-bind:value="format"
                                        v-bind:key="index">{{format}}</md-option> 
                                </md-select>
                            </md-field>
                        </div>
                        <div class="details-row">
                            <md-field>
                                <label>Standard rate</label>
                                <md-input v-model="settings.standardRate" placeholder="Standard rate" type="number"></md-input>
                            </md-field>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
});

export {settingsComponent}

