import Vue from 'vue';



const clientCardComponent = Vue.component('client-card', {
    methods: {
        update: function() {
            this.$router.push('clients/' + this.client._id)
        },
        formatId: function() {
            return this.$root.$options.filters.formatId(this.$store.state.settings.clientIdFormat, this.client.clientId);
        }
    },
    props: ['client'],
    template: `
        <div class="client-card"  v-on:click="update()">
            <div class="client-card__number">
                    {{formatId()}}
                </div>
                <div class="client-card__name">
                    {{client.companyName}}
                </div>
        </div>
    `
});

export {clientCardComponent}

