import Vue from 'vue';
import {lineComponent} from "./line/line";
import {lineToolsComponent} from "./line-tools/line-tools";
import {SortableList} from "./../../shared/sortable/sortableList";
import $ from 'jquery'


const pageComponent = Vue.component('doc-page', {
    props: ['page', 'template', 'editor', 'factor', 'tools'],
    data(){
        return {
            company: this.$store.state.company,
            canAddLines: true
        }
    },
    methods: {
        scale(x) {
            return x * this.factor;
        },
        getDocumentId() {
            return this.page.document.getFormattedId(this.$root.$options.filters.formatId, this.$store.state.settings.documentIdFormat);
        },


        // template methods
        getLogoSrc() {
            return config.templateLocation + this.template.settings.logo.src;
        },
        getTop() {
            return this.page.getType() === 'front' ? this.scale(this.template.settings.content.top) + 'px' : 0;
        },
        getFooterImageSrc() {
            return config.templateLocation + this.template.settings.footerImage.imgSrc;
        },
        getFooterImageWidth() {
            return this.page.getType() === 'front' ? this.scale(this.template.settings.footerImage.width) : 0.8 * this.scale(this.template.settings.footerImage.width);
        },
        getFooterImageTop() {
            return this.page.getType() === 'front' ? this.scale(this.template.settings.footerImage.top) : this.scale(this.template.settings.footerImage.top + 30);
        },
        getTotalTop() {
            return this.page.getType() === 'front' ?  this.scale(this.template.settings.footerImage.top - 130) : this.scale(this.template.settings.footerImage.top + 30 - 130);
        },

        // sortable
        onSortStart(event) {
            $('.main').addClass('unselectable');
        },
        onSortEnd(event) {
            $('.main').removeClass('unselectable');
        },

        // template
        setMarginTop(x, y) {
            this.template.settings.margin.top = y;
        },
        setMarginLeft(x, y) {
            this.template.settings.margin.left = x;
        }
    },
    template: `
        <div 
            v-bind:style="{'font-size': scale(10) + 'px', 'width': scale(620) + 'px', 'height': scale(877) + 'px'}"
            class="page">
            
            
            
            <div class="document__elements"
                v-bind:style="{'left': scale(template.settings.margin.left) + 'px',
                               'top': scale(template.settings.margin.top) + 'px',
                               'right': scale(template.settings.margin.right) + 'px ',
                               'bottom': scale(template.settings.margin.bottom) + 'px'}">
                
                
                
                
                <vue-draggable-resizable
                    class="document__logo iss-resizable" 
                    v-if="page.getType() === 'front'"
                    v-bind:draggable="editor"
                    v-bind:resizable="editor"
                    v-bind:w="scale(template.settings.logo.width)"
                    v-bind:h="scale(template.settings.logo.height)"
                    v-bind:x="scale(template.settings.logo.left)"
                    v-bind:y="scale(template.settings.logo.top)"
                    v-bind:parent="true">
                    <img v-bind:src="getLogoSrc()">
                </vue-draggable-resizable>
                
                
                
                
                
                
                <div class="document__info" v-if="page.getType() === 'front'">
                    <div 
                        v-bind:style="{'margin-right': scale(10) + 'px'}"
                        class="document__date">
                        {{page.document.date | standardDate}}
                    </div>
                    <div 
                        v-bind:style="{'padding': scale(10) + 'px', 'font-size': scale(11) + 'px'}"
                        class="document__document-id">
                        {{template.settings.dictionary.invoice}} 
                        <b>{{getDocumentId()}}</b>
                    </div>
                </div>
                
                <div class="document__addresses"
                    v-if="page.getType() === 'front'"
                    v-bind:style="{'top': scale(template.settings.addresses.top) + 'px',
                                   'border-top': scale(template.settings.addresses.borderTop) + 'px solid #000'}">
                    <div class="document_address-own">
                        <b>{{company.name}}</b><br>
                        {{page.document.userName}}<br>
                        {{company.address}}<br>
                        {{company.postcode}} {{company.city}}
                    </div>
                    <div class="document_address-client">
                        <b>{{page.document.clientCompanyName}}</b><br>
                        {{page.document.clientContactName}}<br>
                        {{page.document.clientStreet}}<br>
                        {{page.document.clientPostcode}} {{company.clientCity}}
                    </div>
                </div>
                
                <div class="document__content"
                    v-bind:style="{'top': getTop()}">
                    <div class="document__subject"
                        v-if="page.getType() === 'front'"
                        v-bind:style="{'border-top': scale(template.settings.subject.borderTop) + 'px solid #000',
                                       'border-bottom': scale(template.settings.subject.borderBottom) + 'px solid #000',
                                       'padding': scale(10) + 'px'}">
                        <b>{{template.settings.dictionary.subject}}:</b> {{page.document.subject}}
                    </div>
                    
                    <div 
                        v-bind:style="{'padding': scale(10) + 'px 0'}"
                        class="document__lines">
                        <SortableList 
                            lockAxis="y" 
                            v-bind:useDragHandle="true" 
                            v-model="page.lines"
                            v-on:sortStart="onSortStart($event)"
                            v-on:sortEnd="onSortEnd($event)">
                            <doc-line 
                                v-for="(line, index) in page.lines" 
                                v-bind:index="index" 
                                v-bind:key="index" 
                                v-bind:line="line"
                                v-bind:tools="tools"
                                v-bind:scale="scale"/>
                        </SortableList>
                    </div>
                    
                    <line-tools 
                        v-if="canAddLines && !page.document.locked && tools" 
                        v-bind:page="page"
                        v-bind:canAddLines="canAddLines"/>
                </div>
                
                <div class="document__total" 
                    v-if="page.showTotal()"
                    v-bind:style="{'top': getTotalTop() + 'px'}">
                    <div 
                        v-bind:style="{'height': scale(20) + 'px'}"
                        class="document__total-line">
                        <div class="document__total-label">
                            Totaal
                        </div>
                         <div class="document__total-value">
                            {{page.document.getTotal() | currency}} {{page.document.currency}}
                        </div>
                    </div>
                    <div 
                        v-bind:style="{'height': scale(20) + 'px'}"
                        class="document__total-line">
                        <div class="document__total-label">
                            BTW 21%
                        </div>
                         <div class="document__total-value">
                            {{page.document.getTotal() * 0.21 | currency}} {{page.document.currency}}
                        </div>
                    </div>
                    <div 
                        v-bind:style="{'font-size': scale(15) + 'px', 'line-height': scale(16) + 'px', 'height': scale(20) + 'px'}"
                        class="document__total-line document__total-line--big">
                        <div class="document__total-label">
                            Te betalen
                        </div>
                         <div class="document__total-value">
                            {{page.document.getTotal() * 1.21 | currency}} {{page.document.currency}}
                        </div>
                    </div>
                    
                    <div class="document__footer-text"
                        v-bind:style="{'font-size': scale(8) + 'px',
                                       'margin-top': scale(20) + 'px',
                                       'border-top': scale(template.settings.footerText.borderTop) + 'px solid #000',
                                       'border-bottom': scale(template.settings.footerText.borderBottom) + 'px solid #000',
                                       'padding': scale(10) + 'px'}">
                        <span v-html="template.settings.dictionary.footer"></span>
                    </div>
                </div>

                <div class="document__footer-image" 
                    v-if="template.settings.footerImage.image"
                    v-bind:style="{'top': getFooterImageTop() + 'px'}">
                    <img v-bind:src="getFooterImageSrc()" v-bind:width="getFooterImageWidth()">    
                </div>
                
                <div class="document__official"
                    v-bind:style="{'font-size': scale(8) + 'px','top': scale(template.settings.official.top) + 'px'}">
                    {{company.name}} | {{company.coc}}  | {{company.vat}}
                </div>
            </div>
            
            <vue-draggable-resizable 
                class="iss-resizer iss-resizer--hor"
                axis="y"
                v-on:dragging="setMarginTop"
                v-bind:draggable="editor"
                v-bind:resizable="false"
                v-bind:y="scale(template.settings.margin.top)"
                v-bind:x="scale(template.settings.margin.left)"
                v-bind:h="1"
                v-bind:minh="1"
                v-bind:w="scale(620 - template.settings.margin.left - template.settings.margin.right)"
                v-bind:parent="true"/>
                
            <vue-draggable-resizable 
                class="iss-resizer iss-resizer--ver"
                axis="x"
                v-on:dragging="setMarginLeft"
                v-bind:draggable="editor"
                v-bind:resizable="false"
                v-bind:y="scale(template.settings.margin.top)"
                v-bind:x="scale(template.settings.margin.left)"
                v-bind:w="1"
                v-bind:minw="1"
                v-bind:h="scale(877 - template.settings.margin.top - template.settings.margin.bottom)"
                v-bind:parent="true"/>
        </div>
    `
});

export {pageComponent}

