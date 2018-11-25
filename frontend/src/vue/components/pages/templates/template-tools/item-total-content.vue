<script>
    export default {
        name: 'item-total-content',
        props: ['item'],
        data(){
            return {
                positions: ['bottom']
            }
        },
        methods: {

        }
    }
</script>


<template>
    <div>
        <div class="tool-box__section">
            <div class="tool-box__row">
                <div class="tool-box__label">
                    Position
                </div>
                <div class="tool-box__content">
                    <md-field>
                        <md-select
                                v-model="item.position"
                                placeholder="Position">
                            <md-option
                                    v-for="(position, index) in positions"
                                    :value="position"
                                    :key="index">{{position}}</md-option>
                        </md-select>
                    </md-field>
                </div>
            </div>
        </div>
        <div class="tool-box__section">
            <div class="tool-box__row">
                <div class="tool-box__label">
                    <md-checkbox v-model="item.totalNet.display">Total net</md-checkbox>
                </div>
                <div class="tool-box__content">
                    <textarea v-model="item.totalNet.content"/>
                </div>
            </div>
            <div class="tool-box__row">
                <div class="tool-box__label">
                    <div class="tool-box__label">
                        <md-checkbox v-model="item.totalVat.display">Total VAT</md-checkbox>
                    </div>
                </div>
                <div class="tool-box__content">
                    <textarea v-model="item.totalVat.content"/>
                </div>
            </div>
            <div class="tool-box__row">
                <div class="tool-box__label">
                    <div class="tool-box__label">
                        <md-checkbox v-model="item.totalGross.display">Total gross</md-checkbox>
                    </div>
                </div>
                <div class="tool-box__content">
                    <textarea v-model="item.totalGross.content"/>
                </div>
            </div>
        </div>
    </div>

</template>


<style lang="scss" scoped>
    .md-checkbox {
        margin: 0;

        .md-checkbox {
            padding-left: 8px;
        }
    }

    textarea {
        width: 100%;
        height: 100px;
        border: 0;
        padding: 4px;
        background: #ddd;
        font-family: inherit;
        outline: none;
        resize: none;
    }
</style>