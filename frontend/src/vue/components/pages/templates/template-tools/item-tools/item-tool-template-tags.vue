<script>
    import templateTag from './tags/template-tag'
    import {DocumentPropertyHandler} from "@tools/document-properties/document-property-handler";
    import _Item from '@models/template/_Item';



    export default {
        name: 'item-tool-template-tags',
        components: {
            templateTag
        },
        props: {
            item: {
                type: _Item,
                required: true
            }
        },
        data() {
            let documentPropertyHandler = new DocumentPropertyHandler();
            return {
                sections: documentPropertyHandler.getAll(),
                localState: {
                    bodyOpen: false
                }
            }
        },
        methods: {
            toggle() {
                this.localState.bodyOpen = !this.localState.bodyOpen;
            }
        }
    }
</script>


<template>
    <div
        :class="{'template-tags--body-open': localState.bodyOpen}"
        class="template-tags">
        <div
            @click="toggle()"
            class="template-tags__head">
            <div class="template-tags__caret">
                <i class="fas fa-caret-right"></i>
            </div>
            Add tags to text
        </div>
        <div

            class="template-tags__body">
            <div class="template-tags__content">
                <div
                        v-for="section in sections"
                        class="template-tags__section">
                    <template-tag
                            v-for="(tag,id) in section.items"
                            :key="id"
                            :tag="tag"
                            :item="item"/>
            </div>

            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .template-tags {
        margin-bottom: 6px;

        &.template-tags--body-open {

            .template-tags__head {

                .template-tags__caret {
                    transform: rotate(90deg);
                }
            }

            .template-tags__body {
                max-height: 500px;
            }
        }

        .template-tags__head {
            cursor: pointer;
            display: flex;

            .template-tags__caret {
                width: 16px;
                margin-right: 2px;
                font-size: 15px;
                text-align: center;
                transition: all 0.5s ease;
            }
        }

        .template-tags__body {
            padding-top: 6px;
            max-height: 0;
            transition: all 0.5s ease;
            overflow: hidden;




            .template-tags__title {
                margin-bottom: 4px;
            }

            .template-tags__content {
                display: flex;
                flex-wrap: wrap;

                .template-tags__section {
                    display: flex;
                    flex-wrap: wrap;
                }
            }
        }
    }
</style>