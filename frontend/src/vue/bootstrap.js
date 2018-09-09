import Vue from 'vue';
import VueRouter from 'vue-router'
import theStore from './store'

// components
import {topbarComponent} from './components/topbar/topbar';
import {menuComponent} from './components/menu/menu';
import {welcomeScreenComponent} from './components/welcome-screen/welcome-screen';
import {companyComponent} from './components/pages/company/company';

Vue.use(VueRouter);

// routing
const routes = [
    { path: '/company', component: companyComponent },
];
const router = new VueRouter({
    routes
});

const bootstrapVue = function(model) {

    const store = theStore;
    theStore.commit('users/init', model.users);



    new Vue({
        el: '#app',
        store,
        router,
        methods: {
            hasCurrentUser() {
                return store.state.users.currentUser !== null;
            }
        },
        template: `
            <div class="main">
                <div class="page">
                    <topbar></topbar>
                    <div class="content">
                        <menubar></menubar>
                          <router-view></router-view>
                    </div>
                </div>
                
                <welcome-screen v-if="!hasCurrentUser()"></welcome-screen>
            </div>
        `
    });
};

export {bootstrapVue};

