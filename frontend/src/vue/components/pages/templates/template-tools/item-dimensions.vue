<script>
    export default {
        name: 'item-dimensions',
        props: ['item'],
        methods: {

        }
    }
</script>


<template>
    <div class="template-tools__section">
        <div class="template-tools__row">
            <div class="template-tools__label">
                Left
            </div>
            <md-field>
                <md-input v-model="item.x" placeholder="left" type="number"/>
            </md-field>
        </div>
        <div class="template-tools__row">
            <div class="template-tools__label">
                Top
            </div>
            <md-field>
                <md-input v-model="item.y" placeholder="top" type="number"/>
            </md-field>
        </div>
        <div class="template-tools__row">
            <div class="template-tools__label">
                Width
            </div>
            <md-field>
                <md-input v-model="item.width" placeholder="width" type="number"/>
            </md-field>
        </div>
        <div class="template-tools__row">
            <div class="template-tools__label">
                Height
            </div>
            <md-field>
                <md-input v-model="item.height" placeholder="height" type="number"/>
            </md-field>
        </div>
    </div>
</template>


<style lang="scss">

</style>