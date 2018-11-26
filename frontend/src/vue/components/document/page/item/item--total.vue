<script>
    import {pageHeight} from '@root/globals';
    import contentParser from './content-parser';

    import $ from 'jquery';

    export default {
        name: 'item-total',
        props: ['item', 'page', 'template', 'factor', 'documentPropertyHandler'],
        methods: {
            scale(value) {
                return value * this.factor;
            },
            getStyleObject() {
                if (this.item.position === 'bottom') {
                    let pageTemplateSettings = this.template.getLinesItem(this.page.getType()),
                        linePosition = pageTemplateSettings.y + pageTemplateSettings.height;
                    return {
                        bottom: this.scale(pageHeight - linePosition - this.template.margin.top - this.template.margin.bottom) + 'px'
                    };
                } else {
                    if (this.documentLines) {
                        let thisPageLines = this.template.getLinesItem(this.page.getType());
                        return {
                            top: this.scale(thisPageLines.y + 20) + Number($(this.documentLines).outerHeight()) + 'px'
                        }
                    } else {
                        return {
                            top: this.scale(100) + 'px'
                        }
                    }
                }
            },

            getTotalNetContent() {
                return contentParser.parse(this.item.totalNet.content, this.documentPropertyHandler);
            },
            getTotalVatContent() {
                return contentParser.parse(this.item.totalVat.content, this.documentPropertyHandler);
            },
            getTotalGrossContent() {
                return contentParser.parse(this.item.totalGross.content, this.documentPropertyHandler);
            },
            getExtraContent() {
                return contentParser.parse(this.item.extraContent.content, this.documentPropertyHandler);
            }
        },
        mounted() {
            this.documentLines = this.$el.parentNode.parentNode.parentNode.firstChild.firstChild;
        }
    }
</script>


<template>
    <div
        class="item__total"
        :style="getStyleObject()">


        <div
            v-if="item.totalNet.display"
            :style="{'height': scale(20) + 'px'}"
            class="item-total__line">
            <div class="item-total__label">
                {{getTotalNetContent()}}
            </div>
            <div class="item-total__value">
                {{page.document.getTotal() | currency}} {{page.document.currency}}
            </div>
        </div>

        <div
            v-if="item.totalVat.display"
            :style="{'height': scale(20) + 'px'}"
            class="item-total__line">
            <div class="item-total__label">
                {{getTotalVatContent()}}
            </div>
            <div class="item-total__value">
                {{page.document.getTotal() * 0.21 | currency}} {{page.document.currency}}
            </div>
        </div>

        <div
            v-if="item.totalGross.display"
            :style="{'font-size': scale(15) + 'px', 'line-height': scale(16) + 'px', 'height': scale(20) + 'px'}"
            class="item-total__line item-total__line--big">
            <div class="item-total__label">
                {{getTotalGrossContent()}}
            </div>
            <div class="item-total__value">
                {{page.document.getTotal() * 1.21 | currency}} {{page.document.currency}}
            </div>
        </div>

        <div class="item-total__extra-content">
            <span v-html="getExtraContent()"></span>
        </div>
    </div>
</template>


<style lang="scss">
    .item__total {
        position: absolute;
        width: 100%;

        .item-total__line {
            display: flex;

            .item-total__label {
                width: 50%;
            }

            .item-total__value {
                width: 50%;
                text-align: right;
            }

            &.item-total__line--big {
                font-weight: 700;

                .item-total__label {

                }

                .item-total__value {

                }
            }
        }

        .document__footer-text {
            position: relative;
            left: -10px;
            width: calc(100% + 20px);
            text-align: center;
        }
    }
</style>