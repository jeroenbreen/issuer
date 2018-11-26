<script>
    import itemList from './item-list/item-list';

    import {Template} from "@models/Template";
    import {Page} from "@models/document/Page";


    export default {
        name: 'template-page-tools',
        props: {
            template: {
                type: Template,
                required: true
            },
            currentPage: {
                type: Page,
                required: true
            }
        },
        components: {
            itemList
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
    <div class="template-page-tools tool-box">
        <div class="tool-box__header">
            Page ({{currentPage.getType()}})
        </div>
        <item-list
            :template="template"
            :page="currentPage"></item-list>

        <div class="tool-box__section">
            <div class="tool-button" @click="addImage()">
                <div class="tool-button__icon">
                    <i class="fas fa-image"></i>
                </div>
                <div class="tool-button__label">
                    Add image
                </div>
            </div>
            <div class="tool-button" @click="addText()">
                <div class="tool-button__icon">
                    <i class="fas fa-font"></i>
                </div>
                <div class="tool-button__label">
                    Add text
                </div>
            </div>
            <div class="tool-button" @click="addBorder()">
                <div class="tool-button__icon">
                    <i class="fas fa-vector-square"></i>
                </div>
                <div class="tool-button__label">
                    Add border
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';
</style>