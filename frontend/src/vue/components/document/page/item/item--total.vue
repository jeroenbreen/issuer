<script>
    export default {
        name: 'item-total',
        props: ['item', 'page', 'template', 'factor'],
        methods: {
            scale(value) {
                return value * this.factor;
            },
            getTotalTop() {
                let pageTemplateSettings = this.template[this.page.getType()];
                return this.scale(pageTemplateSettings.lines.y + pageTemplateSettings.lines.height - 60);
            }
        }
    }
</script>


<template>
    <div>
        Item total
    </div>
    <!--<div class="document__total"-->
    <!--:style="{'top': getTotalTop() + 'px'}">-->
    <!--<div-->
    <!--:style="{'height': scale(20) + 'px'}"-->
    <!--class="document__total-line">-->
    <!--<div class="document__total-label">-->
    <!--Totaal-->
    <!--</div>-->
    <!--<div class="document__total-value">-->
    <!--{{page.document.getTotal() | currency}} {{page.document.currency}}-->
    <!--</div>-->
    <!--</div>-->
    <!--<div-->
    <!--:style="{'height': scale(20) + 'px'}"-->
    <!--class="document__total-line">-->
    <!--<div class="document__total-label">-->
    <!--BTW 21%-->
    <!--</div>-->
    <!--<div class="document__total-value">-->
    <!--{{page.document.getTotal() * 0.21 | currency}} {{page.document.currency}}-->
    <!--</div>-->
    <!--</div>-->
    <!--<div-->
    <!--:style="{'font-size': scale(15) + 'px', 'line-height': scale(16) + 'px', 'height': scale(20) + 'px'}"-->
    <!--class="document__total-line document__total-line&#45;&#45;big">-->
    <!--<div class="document__total-label">-->
    <!--Te betalen-->
    <!--</div>-->
    <!--<div class="document__total-value">-->
    <!--{{page.document.getTotal() * 1.21 | currency}} {{page.document.currency}}-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
</template>


<style lang="scss">
    .document__total {
        position: absolute;
        width: 100%;

        .document__total-line {
            display: flex;

            .document__total-label {
                width: 50%;
            }

            .document__total-value {
                width: 50%;
                text-align: right;
            }

            &.document__total-line--big {
                font-weight: 700;

                .document__total-label {

                }

                .document__total-value {

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