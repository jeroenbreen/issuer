import Vue from 'vue';


const templateToolsComponent = Vue.component('template-tools', {
    props: ['item', 'template'],
    data(){
        return {

        }
    },

    methods: {
        centerHorizontal() {
            this.item.x = (this.template.getElementAreaWidth() - this.item.width) / 2;
        }
    },
    template: `
        <div class="template-tools">
            <div class="template-tools__section">
                <div class="template-tools__row">
                    <div class="template-tools__label">
                        Left
                    </div>
                    <input v-model="item.x">
                </div>
                <div class="template-tools__row">
                    <div class="template-tools__label">
                        Top
                    </div>
                    <input v-model="item.y">
                </div>
                <div class="template-tools__row">
                    <div class="template-tools__label">
                        Width
                    </div>
                    <input v-model="item.width">
                </div>
                <div class="template-tools__row">
                    <div class="template-tools__label">
                        Height
                    </div>
                    <input v-model="item.height">
                </div>
            </div>
            <div class="template-tools__section">
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
    `
});

export {templateToolsComponent}

