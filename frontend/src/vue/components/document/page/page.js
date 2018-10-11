import Vue from 'vue';
import {lineComponent} from "./line/line";
import {SortableList} from "./../../shared/sortable/sortableList";
import $ from 'jquery'


const pageComponent = Vue.component('doc-page', {
    props: ['page', 'type', 'document'],
    data(){
        return {
            template: this.$store.getters.template,
            company: this.$store.state.company,
            canAddLines: true
        }
    },
    methods: {
        getDocumentId() {
            // todo make DRY with document.js
            return this.document.date.getFullYear() + '-' + this.$root.$options.filters.formatId(this.$store.state.settings.documentIdFormat, this.document.documentId);
        },
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

        // template methods
        getLogoSrc() {
            return config.templateLocation + this.template.settings.logo.src;
        },
        getTop() {
            return this.type === 'front' ? this.template.settings.content.top + 'px' : 0;
        },
        getFooterImageSrc() {
            return config.templateLocation + this.template.settings.footerImage.imgSrc;
        },
        getFooterImageWidth() {
            return this.type === 'front' ? this.template.settings.footerImage.width : 0.8 * this.template.settings.footerImage.width;
        },
        getFooterImageTop() {
            return this.type === 'front' ? this.template.settings.footerImage.top : this.template.settings.footerImage.top + 30;
        },
        getTotalTop() {
            return this.type === 'front' ?  this.template.settings.footerImage.top - 130 : this.template.settings.footerImage.top + 30 - 130;
        },

        // sortable
        onSortStart(event) {
            $('.main').addClass('unselectable');
        },
        onSortEnd(event) {
            $('.main').removeClass('unselectable');
        }
    },
    template: `
        <div class="page">
            <div class="document__elements"
                v-bind:style="{'left': template.settings.margin.left + 'px',
                               'top': template.settings.margin.top + 'px',
                               'right': template.settings.margin.right + 'px ',
                               'bottom': template.settings.margin.bottom + 'px'}">
                <div class="document__logo" 
                    v-if="type === 'front'"
                    v-bind:style="{'left': template.settings.logo.left + 'px', 
                                   'top': template.settings.logo.top + 'px'}">
                    <img v-bind:src="getLogoSrc()" v-bind:width="template.settings.logo.width">
                </div>
                
                <div class="document__info" v-if="type === 'front'">
                    <div class="document__date">
                        {{document.date | standardDate}}
                    </div>
                    <div class="document__document-id">
                        {{template.settings.dictionary.invoice}} 
                        <b>{{getDocumentId()}}</b>
                    </div>
                </div>
                
                <div class="document__addresses"
                    v-if="type === 'front'"
                    v-bind:style="{'top': template.settings.addresses.top + 'px',
                                   'border-top': template.settings.addresses.borderTop + 'px solid #000'}">
                    <div class="document_address-own">
                        <b>{{company.name}}</b><br>
                        {{document.userName}}<br>
                        {{company.address}}<br>
                        {{company.postcode}} {{company.city}}
                    </div>
                    <div class="document_address-client">
                        <b>{{document.clientCompanyName}}</b><br>
                        {{document.clientContactName}}<br>
                        {{document.clientStreet}}<br>
                        {{document.clientPostcode}} {{company.clientCity}}
                    </div>
                </div>
                
                <div class="document__content"
                    v-bind:style="{'top': getTop()}">
                    <div class="document__subject"
                        v-if="type === 'front'"
                        v-bind:style="{'border-top': template.settings.subject.borderTop + 'px solid #000',
                                       'border-bottom': template.settings.subject.borderBottom + 'px solid #000'}">
                        <b>{{template.settings.dictionary.subject}}:</b> {{document.subject}}
                    </div>
                    
                    <div class="document__lines">
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
                                v-bind:line="line"/>
                        </SortableList>
                    </div>
                    
                    <div class="lines_tools" v-if="canAddLines">
                        <div 
                            v-on:click="createLine('hourly')" 
                            class="icon-button icon-button--editing-mode">
                            <div class="icon-button__icon">
                                <i class="fas fa-stopwatch"></i>   
                            </div>
                        </div>
                       
                         <div 
                            v-on:click="createLine('sum')" 
                            class="icon-button icon-button--editing-mode">
                            <div class="icon-button__icon">
                                <i class="fas fa-money-bill-wave"></i>
                            </div>
                        </div>
                        <div 
                            v-on:click="createLine('subtotal')" 
                            class="icon-button icon-button--editing-mode">
                            <div class="icon-button__icon">
                                <i class="fas fa-calculator"></i>
                            </div>
                        </div>
                        <div 
                            v-on:click="createLine('text')" 
                            class="icon-button icon-button--editing-mode">
                            <div class="icon-button__icon">
                                <i class="fas fa-text-height"></i>
                            </div>
                        </div>
                        <div 
                            v-on:click="createLine('paragraph')" 
                            class="icon-button icon-button--editing-mode">
                            <div class="icon-button__icon">
                                <i class="fas fa-paragraph"></i>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="document__total" 
                    v-if="page.showTotal()"
                    v-bind:style="{'top': getTotalTop() + 'px'}">
                    <div class="document__total-line">
                        <div class="document__total-label">
                            Totaal
                        </div>
                         <div class="document__total-value">
                            {{document.getTotal() | currency}} {{document.currency}}
                        </div>
                    </div>
                    <div class="document__total-line">
                        <div class="document__total-label">
                            BTW 21%
                        </div>
                         <div class="document__total-value">
                            {{document.getTotal() * 0.21 | currency}} {{document.currency}}
                        </div>
                    </div>
                    <div class="document__total-line document__total-line--big">
                        <div class="document__total-label">
                            Te betalen
                        </div>
                         <div class="document__total-value">
                            {{document.getTotal() * 1.21 | currency}} {{document.currency}}
                        </div>
                    </div>
                    
                    <div class="document__footer-text"
                        v-bind:style="{'border-top': template.settings.footerText.borderTop + 'px solid #000',
                                       'border-bottom': template.settings.footerText.borderBottom + 'px solid #000'}">
                        <span v-html="template.settings.dictionary.footer"></span>
                    </div>
                </div>
                
                
                
                
                
                <div class="document__footer-image" 
                    v-if="template.settings.footerImage.image"
                    v-bind:style="{'top': getFooterImageTop() + 'px'}">
                    <img v-bind:src="getFooterImageSrc()" v-bind:width="getFooterImageWidth()">    
                </div>
                
                <div class="document__official"
                    v-bind:style="{'top': template.settings.official.top + 'px'}">
                    {{company.name}} | {{company.coc}}  | {{company.vat}}
                </div>
                
            </div>
        </div>
    `
});

export {pageComponent}

