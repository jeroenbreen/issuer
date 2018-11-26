<script>
    export default {
        name: 'text-align',
        props: ['item'],
        data(){
            return {
                alignings: [{
                    type: 'left',
                    icon: 'fas fa-align-left'
                }, {
                    type: 'center',
                    icon: 'fas fa-align-center'
                }, {
                    type: 'right',
                    icon: 'fas fa-align-right'
                }]
            }
        },
        methods: {
            setAligning(aligning) {
                this.item.textAlign = aligning.type;
            }
        }
    }
</script>


<template>
    <div class="tool-box__section">
        <div class="tool-box__row">
            <div class="tool-box__label">
                Text Align
            </div>
            <div class="tool-box__content">
                <div
                    v-for="(aligning, index) in alignings"
                    @click="setAligning(aligning)"
                    :key="index"
                    :class="{'template__tool--current': aligning.type === item.textAlign}"
                    class="template__tool">
                    <i class="fas" :class="[aligning.icon]"></i>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
    .tool-box__content {
        display: flex;
    }
</style>