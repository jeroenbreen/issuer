import Vue from 'vue';


const settingsComponent = Vue.component('settings', {
    methods: {
    },
    computed: {
        settings () {
            return this.$store.state.settings
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
                Client numbering: '3zeros'<br>
                Document numbering: '3zeros'
            </div>
        </div>
    `
});

export {settingsComponent}

