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
        <div class="page settings-page">
            Client numbering: '3zeros'<br>
            Document numbering: '3zeros'
        </div>
    `
});

export {settingsComponent}

