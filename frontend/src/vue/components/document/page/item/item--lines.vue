<script>
    import sortableList from "@components/shared/sortable-list";
    import docLine from "@components/document/page/line";
    import $ from 'jquery';


    export default {
        name: 'item-lines',
        components: {
            sortableList, docLine
        },
        props: ['item', 'page', 'factor', 'tools'],
        methods: {
            scale(value) {
                return value * this.factor;
            },

            // sortable
            onSortStart(event) {
                $('.main').addClass('unselectable');
            },
            onSortEnd(event) {
                $('.main').removeClass('unselectable');
            },
        }
    }
</script>


<template>
    <div
        class="item__lines"
        :style="{'padding': scale(10) + 'px 0'}">
        <sortable-list
                lockAxis="y"
                :useDragHandle="true"
                v-model="page.lines"
                @sortStart="onSortStart($event)"
                @sortEnd="onSortEnd($event)">
            <doc-line
                v-for="(line, index) in page.lines"
                :index="index"
                :key="index"
                :line="line"
                :tools="tools"
                :scale="scale"/>
        </sortable-list>
    </div>
</template>


<style lang="scss">
    .item__lines {

        ul {
            padding: 0;
            margin: 0;
        }
    }
</style>