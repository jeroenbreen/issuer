<script>
    export default {
        name: 'item-padding',
        props: ['item'],
        methods: {

        }
    }
</script>


<template>
    <div class="template-tools__section">
        <div class="template-tools__row">
            <div class="template-tools__label">
                Padding
            </div>
            <md-field>
                <md-input v-model="item.padding" placeholder="Padding" type="number"/>
            </md-field>
        </div>
    </div>
</template>


<style lang="scss">

</style>