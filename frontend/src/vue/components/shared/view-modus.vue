<script>
    export default {
        name: 'view-modus',
        props: {
            state: {
                type: Object,
                required: true,
                validator: function (value) {
                    return value.hasOwnProperty('compact') && typeof value.compact === 'boolean';
                }
            },
            type: {
                type: String,
                required: true
            }
        },
        methods: {
            updateViewModus() {
                this.$store.commit('settings/setViewModus', {type: this.type, value: this.state.compact});
            }
        }
    }
</script>


<template>
    <div class="view-modus">
        <md-switch
                @change="updateViewModus()"
                v-model="state.compact"></md-switch>
        <div class="view-modus__label">
            Compact mode
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .view-modus {

        .view-modus__label {
            text-align: right;
        }
    }
</style>