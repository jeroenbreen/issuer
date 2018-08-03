import Vue from 'vue';
import {welcomeScreenComponent} from './components/welcome-screen/welcome-screen';
import {pageComponent} from './components/page/page';


const bootstrapVue = function(model) {
    new Vue({
        el: '#app',
        data: {
            model: model
        },
        template: `
            <div class="main">
                <page v-if="model.currentUser" v-bind:model="model"></page>
                <welcome-screen v-bind:model="model"></welcome-screen>
            </div>
        `
    });
};

export {bootstrapVue};

