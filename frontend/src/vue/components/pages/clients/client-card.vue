<script>
    export default {
        name: 'client-card',
        props: ['client'],
        methods: {
            update: function() {
                this.$router.push('clients/' + this.client._id)
            },
            documentIdFormatter: function() {
                return this.client.getCustomCode(this.$root.$options.filters.documentIdFormatter, this.$store.state.settings.clientIdFormat);
            }
        }
    }
</script>


<template>
    <div class="client-card" @click="update()">
        <div class="client-card__number">
            {{documentIdFormatter()}}
        </div>
        <div class="client-card__name">
            {{client.companyName}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';


    .client-card {
        display: flex;
        border-bottom: $generalBorder;
        height: 40px;
        cursor: pointer;

        &:hover {
            background: $grey-10;
        }

        &:first-child {
            border-top: $generalBorder;
        }

        > * {
            border-right: $generalBorder;
            padding: $general-padding;
            height: 100%;
            display: flex;
            align-items: center;

            &:first-child {
                border-left: $generalBorder;
            }
        }

        .client-card__number {
            width: 50px;
            flex-grow: 0;
            justify-content: space-around;
        }

        .client-card__name {
            width: 100px;
            flex-grow: 20;
            display: flex;

        }
    }
</style>