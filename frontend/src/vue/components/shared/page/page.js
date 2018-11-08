import Vue from 'vue';
import {itemComponent} from "./item/item";
import {lineComponent} from "./line/line";
import {lineToolsComponent} from "./line-tools/line-tools";
import {SortableList} from "./../../shared/sortable/sortableList";
import $ from 'jquery'

import {Template} from "../../../store/models/Template";


let saveBuffer = null;


const pageComponent = Vue.component('doc-page', {
    props: ['page', 'template', 'editor', 'factor', 'tools'],
    watch: {
        clonedTemplate: {
            handler: function() {
                if (this.editor) {
                    if (saveBuffer) {
                        clearTimeout(saveBuffer);
                    }
                    saveBuffer = setTimeout(() => {
                        this.$store.dispatch('templates/update', this.getTemplate().toBackend()).then(() => {
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
            // make a clone to prevent editing the state directly when we are in editor mode
            clonedTemplate: new Template(this.template.clone()),
            company: this.$store.state.company,
            canAddLines: true,
            localState: {
                showSnackbar: false
            }
        }
    },
    methods: {
        getTemplate() {
            return this.editor ? this.clonedTemplate : this.template
        },
        scale(value) {
            return value * this.factor;
        },
        getDocumentId() {
            return this.page.document.getFormattedId(this.$root.$options.filters.formatId, this.$store.state.settings.documentIdFormat);
        },


        // template methods
        getLogoSrc() {
            return config.templateLocation + this.getTemplate().settings.logo.src;
        },
        getTop() {
            return this.page.getType() === 'front' ? this.scale(this.getTemplate().settings.content.top) + 'px' : 0;
        },
        getTotalTop() {
            return 200;
            //return this.page.getType() === 'front' ?  this.scale(this.getTemplate().settings.footerImage.top - 130) : this.scale(this.getTemplate().settings.footerImage.top + 30 - 130);
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
            this.getTemplate().settings.margin.top = y;
        },
        setMarginBottom(x, y) {
            this.getTemplate().settings.margin.bottom = 877 - y;
        },
        setMarginLeft(x, y) {
            this.getTemplate().settings.margin.left = x;
        },
        setMarginRight(x, y) {
            this.getTemplate().settings.margin.right = 620 - x;
        },
        setPositionLogo(left, top) {
            this.getTemplate().settings.logo.left = left;
            this.getTemplate().settings.logo.top = top;
        },
        setSizeLogo(x, y, width, height) {
            if (this.editor) {
                this.getTemplate().settings.logo.width = width;
                this.getTemplate().settings.logo.height = height;
            }
        }
    },
    template: `
        <div 
            v-bind:style="{'font-size': scale(10) + 'px', 'width': scale(620) + 'px', 'height': scale(877) + 'px'}"
            class="page">
            
            
            
            <div class="document__elements"
                v-bind:style="{'left': scale(getTemplate().settings.margin.left) + 'px',
                               'top': scale(getTemplate().settings.margin.top) + 'px',
                               'right': scale(getTemplate().settings.margin.right) + 'px ',
                               'bottom': scale(getTemplate().settings.margin.bottom) + 'px'}">
                
                
                
                
                <vue-draggable-resizable
                    class="document__logo iss-resizable" 
                    v-if="page.getType() === 'front'"
                    v-on:dragging="setPositionLogo"
                    v-on:resizing="setSizeLogo"
                    v-bind:draggable="editor"
                    v-bind:resizable="editor"
                    v-bind:w="scale(getTemplate().settings.logo.width)"
                    v-bind:h="scale(getTemplate().settings.logo.height)"
                    v-bind:x="scale(getTemplate().settings.logo.left)"
                    v-bind:y="scale(getTemplate().settings.logo.top)"
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
                        {{getTemplate().settings.dictionary.invoice}} 
                        <b>{{getDocumentId()}}</b>
                    </div>
                </div>
                
                <div class="document__addresses"
                    v-if="page.getType() === 'front'"
                    v-bind:style="{'top': scale(getTemplate().settings.addresses.top) + 'px',
                                   'border-top': scale(getTemplate().settings.addresses.borderTop) + 'px solid #000'}">
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
                        v-bind:style="{'border-top': scale(getTemplate().settings.subject.borderTop) + 'px solid #000',
                                       'border-bottom': scale(getTemplate().settings.subject.borderBottom) + 'px solid #000',
                                       'padding': scale(10) + 'px'}">
                        <b>{{getTemplate().settings.dictionary.subject}}:</b> {{page.document.subject}}
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
                                       'border-top': scale(getTemplate().settings.footerText.borderTop) + 'px solid #000',
                                       'border-bottom': scale(getTemplate().settings.footerText.borderBottom) + 'px solid #000',
                                       'padding': scale(10) + 'px'}">
                        <span v-html="getTemplate().settings.dictionary.footer"></span>
                    </div>
                </div>
                
                
                <!-- custom items -->
                <item
                    v-if="page.getType() === 'front'"
                    v-for="(item, index) in getTemplate().frontPage.items"
                    v-bind:key="index"
                    v-bind:item="item"
                    v-bind:editor="editor"
                    v-bind:factor="factor"
                    v-bind:template="template"></item>
                
                
                <div class="document__official"
                    v-bind:style="{'font-size': scale(8) + 'px','top': scale(getTemplate().settings.official.top) + 'px'}">
                    {{company.name}} | {{company.coc}}  | {{company.vat}}
                </div>
            </div>
            
            <vue-draggable-resizable 
                class="iss-resizer iss-resizer--hor"
                axis="y"
                v-if="page.getType() === 'front'"
                v-on:dragging="setMarginTop"
                v-bind:draggable="editor"
                v-bind:resizable="false"
                v-bind:y="scale(getTemplate().settings.margin.top)"
                v-bind:x="scale(getTemplate().settings.margin.left)"
                v-bind:h="1"
                v-bind:minh="1"
                v-bind:w="scale(620 - getTemplate().settings.margin.left - getTemplate().settings.margin.right)"
                v-bind:parent="true"/>
                
            <vue-draggable-resizable 
                class="iss-resizer iss-resizer--hor"
                axis="y"
                v-if="page.getType() === 'front'"
                v-on:dragging="setMarginBottom"
                v-bind:draggable="editor"
                v-bind:resizable="false"
                v-bind:y="scale(877 - getTemplate().settings.margin.bottom)"
                v-bind:x="scale(getTemplate().settings.margin.left)"
                v-bind:h="1"
                v-bind:minh="1"
                v-bind:w="scale(620 - getTemplate().settings.margin.left - getTemplate().settings.margin.right)"
                v-bind:parent="true"/>
                
            <vue-draggable-resizable 
                class="iss-resizer iss-resizer--ver"
                axis="x"
                v-if="page.getType() === 'front'"
                v-on:dragging="setMarginLeft"
                v-bind:draggable="editor"
                v-bind:resizable="false"
                v-bind:y="scale(getTemplate().settings.margin.top)"
                v-bind:x="scale(getTemplate().settings.margin.left)"
                v-bind:w="1"
                v-bind:minw="1"
                v-bind:h="scale(877 - getTemplate().settings.margin.top - getTemplate().settings.margin.bottom)"
                v-bind:parent="true"/>
                
            <vue-draggable-resizable 
                class="iss-resizer iss-resizer--ver"
                axis="x"
                v-if="page.getType() === 'front'"
                v-on:dragging="setMarginRight"
                v-bind:draggable="editor"
                v-bind:resizable="false"
                v-bind:y="scale(getTemplate().settings.margin.top)"
                v-bind:x="scale(620 - getTemplate().settings.margin.right)"
                v-bind:w="1"
                v-bind:minw="1"
                v-bind:h="scale(877 - getTemplate().settings.margin.top - getTemplate().settings.margin.bottom)"
                v-bind:parent="true"/>
                
                
            <md-snackbar :md-position="'left'" :md-duration="2000" :md-active.sync="localState.showSnackbar" md-persistent>
                <span>Saved...</span>
            </md-snackbar> 
        </div>
    `
});

export {pageComponent}

