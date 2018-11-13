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
                    v-bind:value="'subject'"
                    v-bind:line="line"
                    v-bind:editbale="editable"></switch-input>
        </div>
        <div class="line-part line-part--25 line-part--end">
            <switch-input
                    v-bind:value="'value'"
                    v-bind:line="line"
                    v-bind:size="'number'"
                    v-bind:editbale="editable"></switch-input>&nbsp;{{line.document.currency}}
        </div>
    </div>
</template>


<style lang="less"></style>
