<script>
    import {ElementMixin} from "vue-slicksort";
    import $ from "jquery";

    export default {
        namae: 'mini-page',
        mixins: [ElementMixin],
        props: ['page']
    }
</script>


<template>
    <li class="mini-page"
        v-bind:class="{'mini-page--current': page === page.document.state.currentPage}"></li>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .mini-page {
        list-style: none;
        margin-bottom: 10px;
        width: 35px;
        height: 50px;
        display: block;
        border: 0;
        background: #fff;
        cursor: pointer;

        &:hover:not(.mini-page--current) {
            background: #ddd;
        }

        &.mini-page--current {
            background: $editing-mode-color;
        }


    }
</style>