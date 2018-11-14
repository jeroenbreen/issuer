<script>
    export default {
        name: 'switch-input',
        props: ['line', 'value', 'size', 'editable']
    }

</script>


<template>
    <div class="switch-input">
        <input
                v-if="editable"
                v-model="line[value]"
                v-bind:class="['line-input--' + size]">
        <span v-if="!editable">
                {{line[value]}}
            </span>
    </div>
</template>


<style lang="scss">      @import '@styles/variables.scss';
    .switch-input {
        display: contents;
    }
</style>