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
        height: 40px;
        cursor: pointer;
        margin-bottom: 8px;
        box-shadow: 1px 1px 7px rgba(0,0,0,0.2);
        background: #fff;
        transition: $compact-transition;

        &:hover {
            background: $grey-10;
        }


        > * {
            padding: $general-padding;
            height: 100%;
            display: flex;
            align-items: center;
        }

        .client-card__number {
            width: 50px;
            flex-grow: 0;
            justify-content: space-around;
            background: $main-theme-color;
            color: #fff;
            transition: $compact-transition;
        }

        .client-card__name {
            width: 100px;
            flex-grow: 20;
            display: flex;

        }
    }

    .clients--compact {

        .client-card {
            height: 28px;
            box-shadow: none;
            margin-bottom: 2px;

            > * {
                padding: $general-padding;
            }

            .client-card__number {
                width: 30px;
            }
        }
    }
</style>