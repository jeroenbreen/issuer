<script>
    export default {
        name: 'item-appearance',
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
    <div class="template-tools__section">
        <div class="template-tools__row">
            <div class="template-tools__label">
                Displayed on
            </div>
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
</template>


<style lang="scss">

</style>