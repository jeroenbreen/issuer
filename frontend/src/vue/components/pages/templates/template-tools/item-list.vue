<script>
    import sortableList from "@components/shared/sortable-list";

    export default {
        name: 'item-list',
        components: {
            sortableList
        },
        props: ['template', 'page'],
        methods: {
            getItems() {
                let page = this.page;
                return this.template.items.filter(function(item){
                    return item.page === 'all' || item.page === page.getType();
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
    <div class="template-tools__section">
        <div
            class="item-list__item"
            v-for="(item, index) in getItems()"
            @click="onClick(item)"
            :key="index"
            :class="{'item-list__item--current': isCurrentItem(item)}">
            <div class="item-list__item-icon">
                <div
                    v-if="item.type === 'image'"
                    :style="{'background-image': 'url(' + item.getSrc() + ')'}"
                    class="item-list__item-image">
                </div>
                <div
                    v-if="item.type === 'border'"
                    :style="{'background': item.background}"
                    class="item-list__item-border"></div>
            </div>
            <div class="item-list__item-label">

                <div
                    v-if="item.type === 'text'"
                    class="item-list__item-text">
                    {{item.content}}
                </div>
                <div
                    v-else
                    class="item-list__item-text">
                    {{item.type}}
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .item-list__item{
        margin: 4px 0;
        background: #fff;
        box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
        cursor: pointer;
        display: flex;
        height: 20px;
        align-items: center;

        &:hover,
        &.item-list__item--current {
            background: $editing-mode-color
        }

        .item-list__item-icon {
            width: 20px;
            height: 100%;
            margin-right: 4px;
            background: #aaa;

            .item-list__item-image {
                height: 100%;
                background-size: cover;
                background-position: 50% 50%;
                background-repeat: no-repeat;
                background-color: #fff;
            }

            .item-list__item-border {
                height: 100%;
            }
        }

        .item-list__item-label {
            width: calc(100% - 24px);
            overflow: hidden;
            white-space: nowrap;
        }


    }
</style>