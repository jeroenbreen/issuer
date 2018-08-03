import Vue from 'vue';
import {avatarComponent} from '../../shared/avatar/avatar';


const topbarComponent = Vue.component('topbar', {
    data: function(){
        return {
            currentUser: null
        };
    },
    methods: {

    },
    props: ['model'],
    template: `
        <div class="topbar">
            Welcome
            <avatar v-bind:user="model.currentUser"></avatar>
        </div>
        
    `
});

export {topbarComponent}

