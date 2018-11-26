<script>
    export default {
        name: 'subtotal-line',
        props: ['line']
    }
</script>


<template>
    <div class="line__subtotal">
        <div class="line__row line__row--heavy">
            <div class="line-part line-part--75 line-part--start">
                Subtotaal
            </div>
            <div class="line-part line-part--25 line-part--end">
                {{line.getValue() | currency}}
                {{line.document.currency}}
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .line__subtotal {
        margin-bottom: 28px;
    }
</style>