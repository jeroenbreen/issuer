import Vue from 'vue';
import VueRouter from 'vue-router'
import VueResource from 'vue-resource';
import store from './vue/store';
import {dataToStore, getObjectId} from '@root/vue/store/store-functions'

// components
import app from './vue/app';
import topBar from '@components/layout/top-bar';
import menuBar from '@components/layout/menu-bar';
import document from '@components/document/document';
import welcomeScreen from '@components/layout/welcome-screen';
import modal from '@components/layout/modal';
import company from '@components/pages/company/company';
import settings from '@components/pages/settings/settings';
import employees from '@components/pages/employees/employees';
import employeeCreate from '@components/pages/employees/employee-create';
import employeeUpdate from '@components/pages/employees/employee-update';
import clients from '@components/pages/clients/clients';
import clientCreate from '@components/pages/clients/client-create';
import clientUpdate from '@components/pages/clients/client-update';
import projects from '@components/pages/projects/projects';
import projectCreate from '@components/pages/projects/project-create';
import projectUpdate from '@components/pages/projects/project-update';
import issues from '@components/pages/issues/issues';
import templates from '@components/pages/templates/templates';


// filters
import {dateFormatter} from './vue/filters/date-formatter';
import {documentIdFormatter} from './vue/filters/document-id-formatter';
import {kebabFormatter} from './vue/filters/kebab-formatter';
import VueCurrencyFilter from 'vue-currency-filter'

// // directives
import {scrimDirective} from './vue/directives/scrim'

// google material for Vue
import VueMaterial from 'vue-material'
import $ from "jquery";
Vue.use(VueMaterial);

// draggable
// import VueDragResize from 'vue-drag-resize'
// Vue.component('vue-drag-resize', VueDragResize);
//
// import VueDraggableResizable from 'vue-draggable-resizable'
// Vue.component('vue-draggable-resizable', VueDraggableResizable);



Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueCurrencyFilter,
    {
        symbol : '',
        thousandsSeparator: '.',
        fractionCount: 2,
        fractionSeparator: ',',
        symbolPosition: 'front',
        symbolSpacing: true
    });


// routing
const routes = [
    { path: '/', component: company },
    { path: '/company', component: company },
    { path: '/settings', component: settings },
    { path: '/employees', component: employees },
    { path: '/employees/new', component: employeeCreate },
    { path: '/employees/:id', component: employeeUpdate },
    { path: '/clients', component: clients },
    { path: '/clients/new', component: clientCreate },
    { path: '/clients/:id', component: clientUpdate },
    { path: '/projects', component: projects },
    { path: '/projects/new', component: projectCreate },
    { path: '/projects/:id', component: projectUpdate },
    { path: '/issues', component: issues },
    { path: '/templates', component: templates }
];
const router = new VueRouter({
    routes
});



let file;

const localStorageCallback = function() {
    dataToStore(store, file.state);
};


const bootstrapVue = function(response) {

    new Vue({
        el: '#app',
        store,
        router,
        components: {
            app
        },
        template: '<app/>'
    });

    if (config.useBackend) {
        $.ajax({
            'url' : config.backend + 'bootstrap',
            'headers': {
                'Accept': 'application/json'
            }
        }).done(function(response){
            dataToStore(store, response);
        });
    } else {

        if (config.useLocalStorage) {
            let fileData = localStorage.getItem('doculator');

            if (fileData) {
                file = JSON.parse(fileData);

                if (config.checkForLocalStorage) {
                    store.commit('confirm', {
                        message: 'There is Doculator data in the local storage. Do you want to load it?',
                        callback: localStorageCallback
                    });
                } else {
                    localStorageCallback(file.state);
                }
            } else {
                console.log('blank');
                getObjectId().then((id) => {
                    let company = {};
                    company._id = id;
                    store.commit('initCompany', company);

                });
            }
        }
    }
};

bootstrapVue();


