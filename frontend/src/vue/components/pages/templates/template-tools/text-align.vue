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
                    icon: 'fas fa-align-left'
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
    <div class="template-tools__section">
        <div class="template-tools__row">
            <div class="template-tools__label">
                Text Align
            </div>
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
</template>


<style lang="scss"></style>