import Vue from 'vue';
import $ from 'jquery';

import { VueEditor } from "vue2-editor";



const textLineComponent = Vue.component('text-line', {
    components: {
        VueEditor
    },
    data() {
        return {
            customToolbar: [
                [{ 'header': [false, 1, 2 ] }],
                ["bold", "italic"],
                [{list: "bullet"}],
                ["link"]
            ]
        }
    },
    methods: {
        onEditorFocus() {
            $('.ql-toolbar').show();
        },
        onEditorBlur() {
            //$('.ql-toolbar').hide();
        }
    },
    props: ['line'],
    template: `
        <div class="line__text">
            <div class="line__row">
                <vue-editor 
                    v-model="line.text"
                    :editorToolbar="customToolbar"
                    @focus="onEditorFocus"
                    @blur="onEditorBlur"></vue-editor>
            </div>
        </div>
    `
});

export {textLineComponent}

