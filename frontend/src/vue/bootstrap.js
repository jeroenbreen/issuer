import Vue from 'vue';

import {welcomeScreenComponent} from './components/welcome-screen/welcome-screen';


const bootstrapVue = function(model) {
    new Vue({
        el: '#app',
        data: {
            model: model
        },
        template: '<welcome-screen v-bind:model="model"></welcome-screen>'
    });
};

export {bootstrapVue};

