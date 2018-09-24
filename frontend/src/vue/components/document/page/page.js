import Vue from 'vue';
import {lineComponent} from "./line/line";
import {SortableList} from "./../../shared/sortable/sortableList";
import $ from 'jquery'


const pageComponent = Vue.component('doc-page', {
    props: ['page', 'type', 'document'],
    data(){
        return {
            settings: this.$store.state.settings.document,
            company: this.$store.state.company,
            canAddLines: true
        }
    },
    methods: {
        getYear() {
            return this.document.date.getFullYear();
        },
        addLine(type) {
            let lastLine, bottomElement, thisY, margin;
            margin= 100;
            lastLine = $(this.$el).find('.line:last-child');
            if (lastLine) {
                thisY = $(lastLine).offset().top + $(lastLine).outerHeight();

                if (this.page.isFrontPage()) {
                    bottomElement = $(this.$el).find('.document__footer-text');
                } else {
                    bottomElement = $(this.$el).find('.document__footer-image');
                }

                if (thisY + margin > $(bottomElement).offset().top) {
                    this.canAddLines = false;
                    this.page.document.addPage('regular');
                    this.page.document.pages[this.page.document.pages.length - 1].addLine(type);
                } else {
                    this.page.addLine(type);
                }

            } else {
                this.page.addLine(type);
            }
        },

        // template methods
        getTop() {
            return this.type === 'front' ? this.settings.content.top + 'px' : 0;
        },
        getFooterImageWidth() {
            return this.type === 'front' ? this.settings.footerImage.width : 0.8 * this.settings.footerImage.width;
        },
        getFooterImageTop() {
            return this.type === 'front' ? this.settings.footerImage.top : this.settings.footerImage.top + 30;
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
        <div class="page"
            v-bind:style="{'padding': settings.margin.top + 'px ' + settings.margin.right + 'px ' + settings.margin.bottom + 'px ' + settings.margin.left + 'px'}">
            
            <div class="document__elements">
                <div class="document__logo" 
                    v-if="type === 'front'"
                    v-bind:style="{'left': settings.logo.left + 'px', 
                                   'top': settings.logo.top + 'px'}">
                    <img v-bind:src="settings.logo.src" v-bind:width="settings.logo.width">
                </div>
                
                <div class="document__info" v-if="type === 'front'">
                    <div class="document__">
                        <b>{{settings.dictionary.invoice}}</b> {{getYear()}} 
                    </div>
                    <div class="document__date">
                        {{document.date | standardDate}}
                    </div>
                </div>
                
                <div class="document__addresses"
                    v-if="type === 'front'"
                    v-bind:style="{'top': settings.addresses.top + 'px',
                                   'border-top': settings.addresses.borderTop + 'px solid #000'}">
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
                        v-bind:style="{'border-top': settings.subject.borderTop + 'px solid #000',
                                       'border-bottom': settings.subject.borderBottom + 'px solid #000'}">
                        <b>{{settings.dictionary.subject}}:</b> {{document.subject}}
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
                    
                    <div class="lines_tools">
                            <div class="icon-button icon-button--color" v-on:click="addLine('hourly')" v-if="canAddLines">
                                <div class="icon-button__icon">
                                    <i class="fas fa-plus"></i>
                                </div>
                            </div>
                        </div>
                </div>
                
                <div class="document__footer-text"
                    v-if="type === 'front'"
                    v-bind:style="{'top': settings.footerText.top + 'px',
                                   'border-top': settings.footerText.borderTop + 'px solid #000',
                                   'border-bottom': settings.footerText.borderBottom + 'px solid #000'}">
                    <span v-html="settings.dictionary.footer"></span>
                </div>
                
                <div class="document__footer-image" 
                    v-if="settings.footerImage.image"
                    v-bind:style="{'top': getFooterImageTop() + 'px'}">
                    <img v-bind:src="settings.footerImage.imgSrc" v-bind:width="getFooterImageWidth()">    
                </div>
                
                <div class="document__official"
                    v-bind:style="{'top': settings.official.top + 'px'}">
                    {{company.name}} | {{company.coc}}  | {{company.vat}}
                </div>
                
            </div>
        </div>
    `
});

export {pageComponent}

