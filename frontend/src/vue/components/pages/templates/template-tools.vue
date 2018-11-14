<script>
    export default {
        props: ['item', 'template'],
        data(){
            return {

            }
        },

        methods: {
            addImage() {
                let image = {
                    src: 'image-placeholder.png',
                    width: 100,
                    height: 100,
                    x: (this.template.getElementAreaWidth() - 200) / 2,
                    y: 100
                };
                this.template.addItem('image', image, 'frontPage');
            },
            removeItem() {
                const template = this.template;
                const item = this.item;

                function callback() {
                    template.removeItem(item);
                }

                this.$store.commit('confirm', {
                    message: 'Are you sure?',
                    callback: callback
                });
            },
            centerHorizontal() {
                this.item.x = (this.template.getElementAreaWidth() - this.item.width) / 2;
            }
        }
    }
</script>


<template>
    <div class="template-tools">
        <div class="template-tools__section">
            <div class="template-tools__label">&nbsp;</div>
            <button v-on:click="addImage()">
                Add Image
            </button>
        </div>
        <div v-if="item" class="template-tools__section">
            <div class="template-tools__label">&nbsp;</div>
            <button v-on:click="removeItem()">
                Remove Item
            </button>
        </div>
        <div v-if="item" class="template-tools__section">
            <div class="template-tools__row">
                <div class="template-tools__label">
                    Left
                </div>
                <md-field>
                    <md-input v-model="item.x" placeholder="left" type="number"></md-input>
                </md-field>
            </div>
            <div class="template-tools__row">
                <div class="template-tools__label">
                    Top
                </div>
                <md-field>
                    <md-input v-model="item.y" placeholder="top" type="number"></md-input>
                </md-field>
            </div>
            <div class="template-tools__row">
                <div class="template-tools__label">
                    Width
                </div>
                <md-field>
                    <md-input v-model="item.width" placeholder="width" type="number"></md-input>
                </md-field>
            </div>
            <div class="template-tools__row">
                <div class="template-tools__label">
                    Height
                </div>
                <md-field>
                    <md-input v-model="item.height" placeholder="height" type="number"></md-input>
                </md-field>
            </div>
        </div>
        <div v-if="item" class="template-tools__section">
            <div class="template-tools__row">
                <div class="template-tools__label">
                    Horiz. centered
                </div>
                <div v-on:click="centerHorizontal()" class="template__tool">
                    <i class="fas fa-arrows-alt-h"></i>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">      @import '@styles/variables.scss';


    .template-tools {
        position: fixed;
        right: 120px;
        top: 20px;
        padding: 20px;

        .template__tool {
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 2px;
            width: 24px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 24px;
            cursor: pointer;

            &:hover {
                background: $editing-mode-color;
            }
        }
    }

    .template-tools__section {
        margin-bottom: 20px;

        .template-tools__row {
            display: flex;
            margin-bottom: 4px;

            .template-tools__label {
                width: 100px;
                color: #fff;
                text-align: right;
                padding: 3px 10px 0 0;
            }

            .md-field {
                width: 50px;
                padding: 0;
                margin: 0;
                min-height: 0;

                input {
                    width: 100%;
                    height: 26px;
                    border: 0;
                    background: #fff;
                    color: #000;
                    padding: 4px;
                    margin: 0;
                    font-size: 12px;
                }
            }
        }
    }
</style>