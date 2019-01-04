<script>
    export default {
        name: 'item-tool-padding',
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
            <div class="tool-box__content">
                <md-field>
                    <md-input v-model.number="item.padding" placeholder="Padding" type="number"/>
                </md-field>
            </div>
        </div>
    </div>
</template>


<style lang="scss">

</style>