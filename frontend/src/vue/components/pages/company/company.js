import Vue from 'vue';


const companyComponent = Vue.component('company', {
    methods: {
    },
    computed: {
        company () {
            return this.$store.state.company
        }
    },
    template: `
        <div class="page company-page">
            <div class="page-section">
                <h1>
                    Company
                </h1>
            </div>
            <div class="page-section">
                <input v-model="company.name"><br>
                <input v-model="company.address"><br>
                <input v-model="company.postcode"><br>
                <input v-model="company.city"><br>
                <input v-model="company.githubHandle"><br>
                <input v-model="company.githubKey">
            </div>
        </div>
    `
});

export {companyComponent}

