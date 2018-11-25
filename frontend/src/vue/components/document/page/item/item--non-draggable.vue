<script>
    import itemTotal from './item--total'

    export default {
        name: 'item-non-draggable',
        components: {
            itemTotal
        },
        props: ['template', 'editor', 'factor', 'item', 'onClick', 'page', 'documentPropertyHandler'],
        methods: {
            selectItem() {
                if (this.editor) {
                    this.$store.commit('templateEditor/setCurrentItemIndex', this.template.items.indexOf(this.item));
                }
            }
        }
    }
</script>


<template>
    <div
        @click="selectItem()"
        class="item--non-draggable">
        <item-total
            v-if="item.type === 'total'"
            :item="item"
            :template="template"
            :page="page"
            :factor="factor"
            :document-property-handler="documentPropertyHandler"/>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .template--active {

        .item--non-draggable {

            > div {
                outline: 1px dashed $editing-mode-color;
            }
        }

        .item--current {

            .item--non-draggable {

                > div {
                    outline: 1px solid $editing-mode-color;
                }
            }
        }
    }
</style>