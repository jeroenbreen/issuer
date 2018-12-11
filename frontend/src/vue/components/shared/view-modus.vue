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
    <md-switch
            @change="updateViewModus()"
            v-model="state.compact">Compact view {{type}}</md-switch>
</template>


<style lang="scss">
    @import '@styles/variables.scss';


</style>