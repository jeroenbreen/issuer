<script>
    export default {
        name: 'item-tool-appearance',
        props: ['item'],
        data(){
            return {
                options: ['front', 'follow', 'all']
            }
        },
        methods: {

        }
    }
</script>


<template>
    <div class="tool-box__section">
        <div class="tool-box__row">
            <div class="tool-box__label">
                Displayed on
            </div>
            <div class="tool-box__content">
                <md-field>
                    <md-select
                            v-model="item.page">
                        <md-option
                                v-for="(option, index) in options"
                                :value="option"
                                :key="index">{{option}}</md-option>
                    </md-select>
                </md-field>
            </div>
        </div>
    </div>
</template>


<style lang="scss">

</style>