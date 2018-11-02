import Vue from 'vue';



const templatesComponent = Vue.component('document-template', {
    props: ['template'],
    data(){
        return {
            company: this.$store.state.company
        }
    },
    methods: {
        scale(x) {
            return x * (210 / 620);
        },
        getLogoSrc() {
            return config.templateLocation + this.template.settings.logo.src;
        },
        getFooterImageSrc() {
            return config.templateLocation + this.template.settings.footerImage.imgSrc;
        }
    },
    template: `
        <div class="template">
            <div class="document__elements"
                v-bind:style="{'left': scale(template.settings.margin.left) + 'px',
                               'top': scale(template.settings.margin.top) + 'px',
                               'right': scale(template.settings.margin.right) + 'px ',
                               'bottom': scale(template.settings.margin.bottom) + 'px'}">
                <div class="document__logo" 
                    v-bind:style="{'left': scale(template.settings.logo.left) + 'px', 
                                   'top': scale(template.settings.logo.top) + 'px'}">
                    <img v-bind:src="getLogoSrc()" v-bind:width="scale(template.settings.logo.width)">
                </div>
                
                <div class="document__footer-image" 
                    v-if="template.settings.footerImage.image"
                    v-bind:style="{'top': scale(template.settings.footerImage.top) + 'px'}">
                    <img v-bind:src="getFooterImageSrc()" v-bind:width="scale(template.settings.footerImage.width)">    
                </div>
                
                <div class="document__official"
                    v-bind:style="{'top': scale(template.settings.official.top) + 'px', 'font-size': scale(8) + 'px'}">
                    {{company.name}} | {{company.coc}}  | {{company.vat}}
                </div>
                
                
            </div>
        </div>
    `
});

export {templatesComponent}