<script>
    import switchInput from '@components/shared/switch-input'

    export default {
        name: 'hourly-line',
        components: {
            switchInput
        },
        props: ['line', 'editable']
    }
</script>


<template>
    <div class="line__row">
        <div class="line-part line-part--50 line-part--start">
            <switch-input
                :value="'subject'"
                :line="line"
                :editable="editable"></switch-input>
        </div>
        <div class="line-part line-part--25 line-part--middle line-part__set">
            <switch-input
                :value="'hours'"
                :line="line"
                :size="'number'"
                :editable="editable"></switch-input>
            ×
            <switch-input
                :value="'rate'"
                :line="line"
                :size="'number'"
                :editable="editable"></switch-input>
            {{line.document.currency}}
        </div>
        <div class="line-part line-part--end line-part--25">
            {{line.getValue() | currency}} {{line.document.currency}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

</style>






