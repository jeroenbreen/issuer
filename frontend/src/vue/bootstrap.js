import Vue from 'vue';
import theStore from './store'
import {welcomeScreenComponent} from './components/welcome-screen/welcome-screen';
import {pageComponent} from './components/page/page';



const bootstrapVue = function(model) {

    const store = theStore;
    theStore.commit('users/init', model.users);



    new Vue({
        el: '#app',
        store: store,
        methods: {
            hasCurrentUser() {
                return store.state.users.currentUser !== null;
            }
        },
        template: `
            <div class="main">
                <page v-if="hasCurrentUser()"></page>
                <welcome-screen v-if="!hasCurrentUser()"></welcome-screen>
            </div>
        `
    });
};

export {bootstrapVue};

