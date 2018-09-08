import Vue from 'vue';
import {topbarComponent} from './topbar/topbar';


const pageComponent = Vue.component('page', {
    methods: {

    },
    props: ['model'],
    template: `
        <div class="content">
            <topbar></topbar>
            <div class="content">
                This is the application
            </div>
        </div>
        
    `
});

export {pageComponent}

