import Vue from 'vue';



const clientCardComponent = Vue.component('client-card', {
    methods: {
        update: function() {
            this.$router.push('clients/' + this.client._id)
        }
    },
    props: ['client'],
    template: `
        <div class="client-card"  v-on:click="update()">
            <div class="client-card__number">
                    {{client.getCustomCode()}}
                </div>
                <div class="client-card__name">
                    {{client.companyName}}
                </div>
        </div>
    `
});

export {clientCardComponent}

