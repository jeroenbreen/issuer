<script>
    import $ from "jquery";

    export default {
        props: ['page', 'canAddLines'],
        methods: {
            createLine(type) {
                let lastLine, bottomElement, thisY, margin;
                margin = 100;
                lastLine = $(this.$el).find('.line:last-child');
                if (lastLine.length > 0) {
                    thisY = $(lastLine).offset().top + $(lastLine).outerHeight();

                    if (this.page.isFrontPage()) {
                        bottomElement = $(this.$el).find('.document__footer-text');
                    } else {
                        bottomElement = $(this.$el).find('.document__footer-image');
                    }

                    if (thisY + margin > $(bottomElement).offset().top) {
                        this.canAddLines = false;
                        this.page.document.addPage('regular');
                        this.page.document.pages[this.page.document.pages.length - 1].createLine(type);
                    } else {
                        this.page.createLine(type);
                    }

                } else {
                    this.page.createLine(type);
                }
            },
        }
    }
</script>


<template>
    <div class="line__tools">
        <div
            @click="createLine('hourly')"
            class="icon-button icon-button--editing-mode">
            <div class="icon-button__icon">
                <i class="fas fa-stopwatch"></i>
            </div>
        </div>

        <div
            @click="createLine('sum')"
            class="icon-button icon-button--editing-mode">
            <div class="icon-button__icon">
                <i class="fas fa-money-bill-wave"></i>
            </div>
        </div>
        <div
            @click="createLine('subtotal')"
            class="icon-button icon-button--editing-mode">
            <div class="icon-button__icon">
                <i class="fas fa-calculator"></i>
            </div>
        </div>
        <div
            @click="createLine('text')"
            class="icon-button icon-button--editing-mode">
            <div class="icon-button__icon">
                <i class="fas fa-text-height"></i>
            </div>
        </div>
        <div
            @click="createLine('break')"
            class="icon-button icon-button--editing-mode">
            <div class="icon-button__icon">
                <i class="fas fa-paragraph"></i>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .line__tools {
        position: absolute;
        left: calc(100% + 20px);
        top: 0;
        display: flex;
        flex-wrap: nowrap;

        .line__tool {
            cursor: pointer;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: $editing-mode-color;
            color: $editing-mode-color-contra;
            display: flex;
            justify-content: space-around;
            align-items: center;

            &:hover {
                background: $editing-mode-color-hover;
            }
        }
    }
</style>

