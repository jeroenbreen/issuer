<script>
    export default {
        name: 'document-properties',
        props: ['documentPropertyHandler']
    }
</script>


<template>
    <div class="tool-box">
        <div class="tool-box__header">
            Document content
        </div>
        <div
                v-for="set in documentPropertyHandler.getUsedPropertyHandlers(true)"
                class="tool-box__section">
            <div
                    v-for="item in set.items"
                    v-if="item.editable"
                    class="tool-box__row">

                <div class="tool-box__label">
                    {{item.title}}
                </div>
                <md-field>
                    <md-input
                            v-model="documentPropertyHandler[item.getObjectPath()[0]][item.getObjectPath()[1]]"/>
                </md-field>
            </div>
        </div>
    </div>
</template>


<style lang="scss">

</style>