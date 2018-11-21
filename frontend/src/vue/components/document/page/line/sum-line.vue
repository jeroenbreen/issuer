<script>
    import switchInput from "@components/shared/switch-input";

    export default {
        name: 'sum-line',
        components: {
            switchInput
        },
        props: ['line', 'editable']
    }
</script>


<template>
    <div class="line__row">
        <div class="line-part line-part--75 line-part--start">
            <switch-input
                :value="'subject'"
                :line="line"
                :editable="editable"></switch-input>
        </div>
        <div class="line-part line-part--25 line-part--end">
            <switch-input
                :value="'value'"
                :line="line"
                :size="'number'"
                :editable="editable"></switch-input>&nbsp;{{line.document.currency}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';
</style>
