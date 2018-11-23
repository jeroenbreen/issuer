<script>
    import sortableList from "@components/shared/sortable-list";
    import itemListImage from "./item-list-image";
    import itemListText from "./item-list-text";
    import itemListBorder from "./item-list-border";
    import itemListTotal from "./item-list-total";

    export default {
        name: 'item-list',
        components: {
            sortableList, itemListImage, itemListText, itemListBorder, itemListTotal
        },
        props: ['template', 'page'],
        methods: {
            getItems() {
                let page = this.page;
                return this.template.items.filter(function(item){
                    return item.page === 'all' || item.page === page.getType() || (item.type === 'total' && page.showTotal());
                })
            },
            onClick(item) {
                this.$store.commit('templateEditor/setCurrentItemIndex', this.template.items.indexOf(item));
            },
            isCurrentItem(item) {
                return this.$store.state.templateEditor.currentItemIndex === this.template.items.indexOf(item);
            }
        }
    }
</script>


<template>
    <div class="tool-box__section">
        <div
            class="item-list-item"
            v-for="(item, index) in getItems()"
            @click="onClick(item)"
            :key="index"
            :class="{'item-list-item--current': isCurrentItem(item)}">

            <item-list-image
                v-if="item.type === 'image'"
                :item="item"/>

            <item-list-text
                v-if="item.type === 'text'"
                :item="item"/>

            <item-list-border
                v-if="item.type === 'border'"
                :item="item"/>

            <item-list-total
                    v-if="item.type === 'total'"
                    :item="item"/>

        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .item-list-item {
        background: #fff;
        border-bottom: 1px solid #ddd;
        cursor: pointer;
        height: 20px;
        font-size: 9px;

        &:hover,
        &.item-list-item--current {
            background: $editing-mode-color
        }

        .item-list-item__container {
            display: flex;
            height: 100%;
            align-items: center;

            .item-list__icon {
                width: 20px;
                height: 100%;
                margin-right: 4px;
                background-size: cover;
                background-position: 50% 50%;
                background-repeat: no-repeat;
                background-color: #fff;
                text-align: center;
            }

            .item-list__label {
                width: calc(100% - 24px);
                overflow: hidden;
                white-space: nowrap;
            }
        }
    }
</style>