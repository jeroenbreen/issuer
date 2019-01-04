<script>
    export default {
        name: 'template-margins',
        props: ['template']
    }
</script>


<template>
    <div class="template-margins">
        <div class="tool-box__row">
            <div class="tool-box__label">
                Margin top
            </div>
            <div class="tool-box__content">
                <md-field>
                    <md-input v-model.number="template.margin.top" placeholder="Margin top" type="number"/>
                </md-field>
            </div>
        </div>
        <div class="tool-box__row">
            <div class="tool-box__label">
                Margin right
            </div>
            <div class="tool-box__content">
                <md-field>
                    <md-input v-model.number="template.margin.right" placeholder="Margin right" type="number"/>
                </md-field>
            </div>
        </div>
        <div class="tool-box__row">
            <div class="tool-box__label">
                Margin bottom
            </div>
            <div class="tool-box__content">
                <md-field>
                    <md-input v-model.number="template.margin.bottom" placeholder="Margin bottom" type="number"/>
                </md-field>
            </div>
        </div>
        <div class="tool-box__row">
            <div class="tool-box__label">
                Margin left
            </div>
            <div class="tool-box__content">
                <md-field>
                    <md-input v-model.number="template.margin.left" placeholder="Margin left" type="number"/>
                </md-field>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

</style>