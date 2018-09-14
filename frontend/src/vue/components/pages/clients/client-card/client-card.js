import Vue from 'vue';



const clientCardComponent = Vue.component('client-card', {
    methods: {
        deleteItem: function() {
            this.$store.dispatch('clients/delete', this.client);
        },
        update: function() {
            this.$router.push('clients/' + this.client._id)
        }
    },
    props: ['client'],
    template: `
        <div class="client-card">
            <div class="client-card__body">
                <div class="client-card__number">
                    {{client.getCustomCode()}}
                </div>
                <div class="client-card__name">
                    {{client.companyName}}
                </div>
            </div>
            <div class="client-card__toolbar">
                <div class="icon-button icon-button--inverse" v-on:click="update()">
                    <div class="icon-button__icon">
                        <i class="fas fa-pencil-alt"></i>
                    </div>
                    <div class="icon-button__label">
                        Update
                    </div>
                </div>
                <div class="icon-button icon-button--inverse" v-on:click="deleteItem()">
                    <div class="icon-button__icon">
                        <i class="fas fa-trash"></i>
                    </div>
                    <div class="icon-button__label">
                        Remove
                    </div>
                </div>
            </div>
        </div>
    `
});

export {clientCardComponent}

