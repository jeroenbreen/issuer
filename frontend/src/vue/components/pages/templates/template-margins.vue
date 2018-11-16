<script>
    export default {
        name: 'template-margins',
        props: ['template']
    }
</script>


<template>
    <div class="template-margins">
        <div class="template-tools__row">
            <div class="template-tools__label">
                Margin top
            </div>
            <md-field>
                <md-input v-model="template.margin.top" placeholder="Margin top" type="number"/>
            </md-field>
        </div>
        <div class="template-tools__row">
            <div class="template-tools__label">
                Margin right
            </div>
            <md-field>
                <md-input v-model="template.margin.right" placeholder="Margin right" type="number"/>
            </md-field>
        </div>
        <div class="template-tools__row">
            <div class="template-tools__label">
                Margin bottom
            </div>
            <md-field>
                <md-input v-model="template.margin.bottom" placeholder="Margin bottom" type="number"/>
            </md-field>
        </div>
        <div class="template-tools__row">
            <div class="template-tools__label">
                Margin left
            </div>
            <md-field>
                <md-input v-model="template.margin.left" placeholder="Margin left" type="number"/>
            </md-field>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

</style>