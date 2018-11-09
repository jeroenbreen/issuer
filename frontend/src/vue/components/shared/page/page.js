import Vue from 'vue';
import {itemComponent} from "./item/item";
import {lineComponent} from "./line/line";
import {lineToolsComponent} from "./line-tools/line-tools";
import {SortableList} from "./../../shared/sortable/sortableList";
import $ from 'jquery'

import {Template} from "../../../store/models/Template";


let saveBuffer = null;


const pageComponent = Vue.component('doc-page', {
    props: ['page', 'template', 'editor', 'factor', 'tools', 'onSelectItem'],
    watch: {
        clonedTemplate: {
            handler: function() {
                if (this.editor) {
                    if (saveBuffer) {
                        clearTimeout(saveBuffer);
                    }
                    saveBuffer = setTimeout(() => {
                        this.$store.dispatch('templates/update', this.template.toBackend()).then(() => {
                            // todo: use 1 global snackbar
                            this.localState.showSnackbar = true;
                            // todo: update the original, so other pages
                            // are update with the edits
                        });
                    }, 500)
                }
            },
            deep: true
        }
    },
    data(){
        return {
            company: this.$store.state.company,
            canAddLines: true,
            localState: {
                showSnackbar: false
            }
        }
    },
    methods: {
        scale(value) {
            return value * this.factor;
        },
        getDocumentId() {
            return this.page.document.getFormattedId(this.$root.$options.filters.formatId, this.$store.state.settings.documentIdFormat);
        },


        // template methods
        getTop() {
            return this.page.getType() === 'front' ? this.scale(this.template.settings.content.top) + 'px' : 0;
        },
        getTotalTop() {
            return 200;
            //return this.page.getType() === 'front' ?  this.scale(this.template.settings.footerImage.top - 130) : this.scale(this.template.settings.footerImage.top + 30 - 130);
        },

        // sortable
        onSortStart(event) {
            $('.main').addClass('unselectable');
        },
        onSortEnd(event) {
            $('.main').removeClass('unselectable');
        },



        // template
        selectItem(item) {
            if (this.editor) {
                this.onSelectItem(item);
            }
        },
        setMarginTop(x, y) {
            this.template.settings.margin.top = y;
        },
        setMarginBottom(x, y) {
            this.template.settings.margin.bottom = 877 - y;
        },
        setMarginLeft(x, y) {
            this.template.settings.margin.left = x;
        },
        setMarginRight(x, y) {
            this.template.settings.margin.right = 620 - x;
        },
        setPositionLogo(left, top) {
            this.template.settings.logo.left = left;
            this.template.settings.logo.top = top;
        },
        setSizeLogo(x, y, width, height) {
            if (this.editor) {
                this.template.settings.logo.width = width;
                this.template.settings.logo.height = height;
            }
        }
    },
    template: `
        <div 
            v-bind:style="{'font-size': scale(10) + 'px', 'width': scale(620) + 'px', 'height': scale(877) + 'px'}"
            v-bind:class="{'template--active': editor}"
            class="page">
            
            
            
            <div class="document__elements"
                v-bind:style="{'left': scale(template.settings.margin.left) + 'px',
                               'top': scale(template.settings.margin.top) + 'px',
                               'right': scale(template.settings.margin.right) + 'px ',
                               'bottom': scale(template.settings.margin.bottom) + 'px'}">
                
                
                
                
                <vue-draggable-resizable
                    class="document__logo iss-resizable" 
                    v-if="page.getType() === 'front'"
                    v-on:dragging="setPositionLogo"
                    v-on:resizing="setSizeLogo"
                    v-bind:draggable="editor"
                    v-bind:resizable="editor"
                    v-bind:w="scale(template.settings.logo.width)"
                    v-bind:h="scale(template.settings.logo.height)"
                    v-bind:x="scale(template.settings.logo.left)"
                    v-bind:y="scale(template.settings.logo.top)"
                    v-bind:parent="true">
                    <img v-bind:src="template.getLogoSrc()">
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
                
                
                <!-- custom items -->
                <item
                    v-if="page.getType() === 'front'"
                    v-for="(item, index) in template.frontPage.items"
                    v-on:click.native="selectItem(item)"
                    v-bind:key="index"
                    v-bind:item="item"
                    v-bind:editor="editor"
                    v-bind:factor="factor"
                    v-bind:template="template"></item>
                
                
                <div class="document__official"
                    v-bind:style="{'font-size': scale(8) + 'px','top': scale(template.settings.official.top) + 'px'}">
                    {{company.name}} | {{company.coc}}  | {{company.vat}}
                </div>
            </div>
            
            <vue-draggable-resizable 
                class="iss-resizer iss-resizer--hor"
                axis="y"
                v-if="editor && page.getType() === 'front'"
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
                class="iss-resizer iss-resizer--hor"
                axis="y"
                v-if="editor && page.getType() === 'front'"
                v-on:dragging="setMarginBottom"
                v-bind:draggable="editor"
                v-bind:resizable="false"
                v-bind:y="scale(877 - template.settings.margin.bottom)"
                v-bind:x="scale(template.settings.margin.left)"
                v-bind:h="1"
                v-bind:minh="1"
                v-bind:w="scale(620 - template.settings.margin.left - template.settings.margin.right)"
                v-bind:parent="true"/>
                
            <vue-draggable-resizable 
                class="iss-resizer iss-resizer--ver"
                axis="x"
                v-if="editor && page.getType() === 'front'"
                v-on:dragging="setMarginLeft"
                v-bind:draggable="editor"
                v-bind:resizable="false"
                v-bind:y="scale(template.settings.margin.top)"
                v-bind:x="scale(template.settings.margin.left)"
                v-bind:w="1"
                v-bind:minw="1"
                v-bind:h="scale(877 - template.settings.margin.top - template.settings.margin.bottom)"
                v-bind:parent="true"/>
                
            <vue-draggable-resizable 
                class="iss-resizer iss-resizer--ver"
                axis="x"
                v-if="editor && page.getType() === 'front'"
                v-on:dragging="setMarginRight"
                v-bind:draggable="editor"
                v-bind:resizable="false"
                v-bind:y="scale(template.settings.margin.top)"
                v-bind:x="scale(620 - template.settings.margin.right)"
                v-bind:w="1"
                v-bind:minw="1"
                v-bind:h="scale(877 - template.settings.margin.top - template.settings.margin.bottom)"
                v-bind:parent="true"/>
                
                
            <md-snackbar :md-position="'left'" :md-duration="2000" :md-active.sync="localState.showSnackbar" md-persistent>
                <span>Saved...</span>
            </md-snackbar> 
        </div>
    `
});

export {pageComponent}

