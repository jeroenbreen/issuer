import Vue from 'vue';
import {topbarComponent} from './topbar/topbar';


const pageComponent = Vue.component('page', {
    data: function(){
        return {
            currentUser: null
        };
    },
    methods: {

    },
    props: ['model'],
    template: `
        <div class="content">
            <topbar v-bind:model="model"></topbar>
            <div class="content">
                This is the application
            </div>
        </div>
        
    `
});

export {pageComponent}

