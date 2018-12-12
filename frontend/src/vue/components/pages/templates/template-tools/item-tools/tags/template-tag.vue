<script>
    import _Item from '@models/template/_Item';

    export default {
        name: 'template-tag',
        props: {
            tag: {
                type: Object,
                required: true
            },
            item: {
                type: _Item,
                required: true
            }
        },
        methods: {
            addTag() {
                let text = '{' + this.tag.tag + '}';
                // if content doesnt end already with a space, we add it
                if (this.item.content.length > 0 && this.item.content[this.item.content.length - 1] !== ' ') {
                    text = ' ' + text;
                }
                this.item.content = this.item.content + text;
            }
        }
    }
</script>


<template>
    <div
        @click="addTag()"
        class="template-tag">
        {{tag.title}}
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .template-tag {
        padding: 2px 6px;
        border-radius: 5px;
        margin: 0 3px 3px 0;
        display: flex;
        align-items: center;
        background: $editing-mode-color;
        cursor: pointer;
        font-size: 10px;
        height: 20px;
        white-space: nowrap;

        &:hover {
            background: #000;
            color: #fff;
        }
    }
</style>