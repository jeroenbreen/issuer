import Vue from 'vue';
import {templateComponent} from './template/template';



const templatesComponent = Vue.component('templates', {
    methods: {
        getAll: function(){
            return this.$store.state.templates.all;
        },
        create: function() {
            this.$router.push('templates/new');
        }
    },
    template: `
        <div class="page page--templates" v-scrim>
            <div class="page-section">
                <h1>
                    Templates
                </h1>
            </div>
            <div class="page-section">
                <div class="templates">
                    <document-template
                        v-for="template in getAll()" 
                        v-bind:key="template._id"
                        v-bind:template="template"></document-template>
                </div>
            </div>
            <div class="page-section">
                <md-button v-on:click="create()" class="md-primary">Create Template</md-button>
            </div>
        </div>
    `
});

export {templatesComponent}