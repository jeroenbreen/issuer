<script>
    export default {
        name: 'document-properties',
        props: ['documentPropertyHandler']
    }
</script>


<template>
    <div class="document-properties">
        <div
            v-for="set in documentPropertyHandler.getUsedPropertyHandlers()"
            class="document-properties__set">
            <div class="document-properties__set-title">
                {{set.title}}
            </div>
            <div
                v-for="item in set.items"
                v-if="item.editable"
                class="document-properties__item">

                <md-field>
                    <label>{{item.title}}</label>
                    <md-input
                        v-model="documentPropertyHandler[item.getObjectPath()[0]][item.getObjectPath()[1]]"/>
                </md-field>
            </div>
        </div>
    </div>

</template>


<style lang="scss">
    .document-properties {
        position: fixed;
        left: 40px;
        top: 40px;
        height: calc(100% - 40px);
        overflow: auto;
        background: #fff;

        width: 220px;

        .document-properties__set {
            border-bottom: 1px solid #000;

            .document-properties__set-title {
                font-weight: 700;
                padding: 10px;
                margin-bottom: 20px;
            }

            .document-properties__item {
                padding: 10px;
                border-bottom: 1px solid #ddd;
            }
        }
    }
</style>