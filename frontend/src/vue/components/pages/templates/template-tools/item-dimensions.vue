<script>
    export default {
        name: 'item-dimensions',
        props: ['item'],
        methods: {

        }
    }
</script>


<template>
    <div class="tool-box__section">
        <div
            v-if="item.type !== 'box'"
            class="tool-box__row">
            <div class="tool-box__label">
                Left
            </div>
            <div class="tool-box__content">
                <md-field>
                    <md-input v-model="item.x" placeholder="left" type="number"/>
                </md-field>
            </div>
        </div>
        <div class="tool-box__row">
            <div class="tool-box__label">
                Top
            </div>
            <div class="tool-box__content">
                <md-field>
                    <md-input v-model="item.y" placeholder="top" type="number"/>
                </md-field>
            </div>
        </div>
        <div
            v-if="item.type !== 'box'"
            class="tool-box__row">
            <div class="tool-box__label">
                Width
            </div>
            <div class="tool-box__content">
                <md-field>
                    <md-input v-model="item.width" placeholder="width" type="number"/>
                </md-field>
            </div>
        </div>
        <div class="tool-box__row">
            <div class="tool-box__label">
                Height
            </div>
            <div class="tool-box__content">
                <md-field>
                    <md-input v-model="item.height" placeholder="height" type="number"/>
                </md-field>
            </div>
        </div>
    </div>
</template>


<style lang="scss">

</style>