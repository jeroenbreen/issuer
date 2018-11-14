<script>
    export default {
        name: 'sum-line',
        props: ['line', 'editable']
    }
</script>


<template>
    <div class="line__row">
        <div class="line-part line-part--75 line-part--start">
            <switch-input
                    :value="'subject'"
                    :line="line"
                    :editbale="editable"></switch-input>
        </div>
        <div class="line-part line-part--25 line-part--end">
            <switch-input
                    :value="'value'"
                    :line="line"
                    :size="'number'"
                    :editbale="editable"></switch-input>&nbsp;{{line.document.currency}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';
</style>
