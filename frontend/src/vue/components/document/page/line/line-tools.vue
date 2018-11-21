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
    <div class="tool-box__section">
        <div
                @click="createLine('hourly')"
                class="tool-button">
            <div class="tool-button__icon">
                <i class="fas fa-stopwatch"></i>
            </div>
            <div class="tool-button__label">
                Add hourly line
            </div>
        </div>
        <div
                @click="createLine('sum')"
                class="tool-button">
            <div class="tool-button__icon">
                <i class="fas fa-money-bill-wave"></i>
            </div>
            <div class="tool-button__label">
                Add sum line
            </div>
        </div>
        <div
                @click="createLine('subtotal')"
                class="tool-button">
            <div class="tool-button__icon">
                <i class="fas fa-calculator"></i>
            </div>
            <div class="tool-button__label">
                Add subtotal
            </div>
        </div>
        <div
                @click="createLine('text')"
                class="tool-button">
            <div class="tool-button__icon">
                <i class="fas fa-font"></i>
            </div>
            <div class="tool-button__label">
                Add text element
            </div>
        </div>
        <div
                @click="createLine('break')"
                class="tool-button">
            <div class="tool-button__icon">
                <i class="fas fa-paragraph"></i>
            </div>
            <div class="tool-button__label">
                Insert break
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';
</style>

