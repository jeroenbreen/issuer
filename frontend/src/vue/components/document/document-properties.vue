<script>

    export default {
        name: 'document-properties',
        components: {

        },
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
                <div class="tool-box__content">
                    <md-field v-if="item.type === 'input'">
                        <md-input
                                v-model="documentPropertyHandler[item.getObjectPath()[0]][item.getObjectPath()[1]]"/>
                    </md-field>

                    <md-field v-if="item.type === 'input--number'">
                        <md-input
                                v-model="documentPropertyHandler[item.getObjectPath()[0]][item.getObjectPath()[1]]"
                                type="number"/>
                    </md-field>
                    <span v-if="item.type === 'date'">
                    <md-datepicker

                            v-model="documentPropertyHandler[item.getObjectPath()[0]][item.getObjectPath()[1]]"
                            md-immediately/>
                </span>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">

    .md-datepicker {

        > .md-date-icon,
        > button {
            display: none;
        }
    }

    .md-datepicker-dialog {
        z-index: 10000000000;
    }
</style>