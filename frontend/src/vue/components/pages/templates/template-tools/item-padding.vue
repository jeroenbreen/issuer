<script>
    export default {
        name: 'item-padding',
        props: ['item'],
        methods: {

        }
    }
</script>


<template>
    <div class="tool-box__section">
        <div class="tool-box__row">
            <div class="tool-box__label">
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