<script>
    import sortableList from "@components/shared/sortable-list";
    import miniPage from "./mini-page";
    import $ from "jquery";
    import {pageHeight} from "@root/globals"

    const pageMargin = 40;
    const scrollBuffer = 20;

    export default {
        name: 'document-index',
        components: {
            sortableList, miniPage
        },
        props: ['document', 'factor'],
        mounted () {
            const container = $('.document__container');

            const document = this.document;
            const factor = this.factor;

            this.setCurrentPage();

            container.scroll(function(event){
                let scroll = container.scrollTop(),
                    pageIndex = Math.floor((scroll + scrollBuffer) / (pageHeight * factor + pageMargin));
                document.state.currentPage = document.pages[pageIndex];
            })
        },
        methods: {
            onSortEnd(event) {
                this.goto(event.newIndex);
            },
            setCurrentPage() {
                if (!this.document.state.currentPage && this.document.pages.length > 0) {
                    this.document.state.currentPage = this.document.pages[0];
                    this.goto(0);
                }
            },
            goto(n) {
                $('.document__container').animate({
                    scrollTop: n * (pageHeight * this.factor + pageMargin) - scrollBuffer
                }, 1000);
            }
        }
    }
</script>


<template>
    <div class="document-index">
        <sortable-list
            lockAxis="y"
            v-model="document.pages"
            @sortEnd="onSortEnd($event)">
            <mini-page
                v-for="(page, index) in document.pages"
                :index="index"
                :key="index"
                :page="page"></mini-page>
        </sortable-list>
    </div>
</template>


<style lang="scss">
    .document-index {
        position: fixed;
        right: calc(50% + 340px);
        top: 40px;
        width: 50px;
        height: calc(100% + 80px);
        overflow: auto;

        ul {
            padding: 0;
            margin: 0;
        }
    }
</style>