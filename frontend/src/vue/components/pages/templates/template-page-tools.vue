<script>
    export default {
        name: 'template-page-tools',
        props: ['template', 'currentPage'],
        components: {

        },
        methods: {
            addImage() {
                let data = {
                    type: 'image',
                    src: 'image-placeholder.png',
                    width: 100,
                    height: 100,
                    x: (this.template.getElementAreaWidth() - 100) / 2,
                    y: 100,
                    padding: 0,
                    background: 'transparent',
                    page: this.currentPage.getType()
                };
                this.template.addItem(data);
            },
            addText() {
                let data = {
                    type: 'text',
                    content: '',
                    width: 100,
                    height: 100,
                    x: (this.template.getElementAreaWidth() - 100) / 2,
                    y: 100,
                    padding: 0,
                    background: 'transparent',
                    page: this.currentPage.getType()
                };
                this.template.addItem(data);
            },
            addBorder() {
                let data = {
                    type: 'border',
                    x: 0,
                    y: 100,
                    height: 1,
                    width: this.template.getElementAreaWidth(),
                    background: '#000',
                    page: this.currentPage.getType()
                };
                this.template.addItem(data);
            }
        }
    }
</script>


<template>
    <div class="template-page-tools template-tools">
        <div class="template-tools__header">
            Page
        </div>
        <div class="template-tools__section">
            <div class="template-tools__row">
                <div class="template-tools__label">
                    Page type
                </div>
                <span>
                    {{currentPage.getType()}}
                </span>
            </div>
        </div>
        <div class="template-tools__section">
            <button @click="addImage()">
                Add Image
            </button>
            <button @click="addText()">
                Add Text
            </button>
            <button @click="addBorder()">
                Add Border
            </button>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';
</style>