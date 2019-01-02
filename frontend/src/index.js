import Vue from 'vue';
import VueRouter from 'vue-router'
import VueResource from 'vue-resource';
import store from './vue/store';
import vueShortkey from 'vue-shortkey';
import {dataToStore, getObjectId} from '@root/vue/store/store-functions'

// components
import app from './vue/app';
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

// undo/redo
import History from '@store/history';
Vue.use(History);
// Vue.use(History, {
//     store: new History.Store({ count: 0 })
// });

Vue.use(vueShortkey);


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
    dataToStore(store, file.state, false);
};


const bootstrapVue = function(response) {

    new Vue({
        el: '#app',
        store,
        router,
        History,
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
            console.log(response);
            dataToStore(store, response, true);
        });
    } else {

        let statuses = [
          {
            "_id": "5bffc03f603f0010ab2cdef9",
            "order": 1,
            "title": "pipeline",
            "color": "#B29E49",
            "company_id": "5b94e03979f9b308ffa9c60e",
            "type": "regular"
          },
          {
            "_id": "5bffc061603f0010ab2cdefa",
            "order": 2,
            "title": "quotation",
            "color": "#35C620",
            "company_id": "5b94e03979f9b308ffa9c60e",
            "type": "regular"
          },
          {
            "_id": "5bffc079603f0010ab2cdefb",
            "order": 3,
            "title": "agreed",
            "color": "#2EC3DB",
            "company_id": "5b94e03979f9b308ffa9c60e",
            "type": "regular"
          },
          {
            "_id": "5bffc0ba603f0010ab2cdefc",
            "order": 4,
            "title": "invoice",
            "color": "#CC2F2F",
            "company_id": "5b94e03979f9b308ffa9c60e",
            "type": "invoice"
          },
          {
            "_id": "5bffc0e2603f0010ab2cdefd",
            "order": 5,
            "title": "paid",
            "color": "#ddd",
            "company_id": "5b94e03979f9b308ffa9c60e",
            "type": "invoice"
          },
          {
            "_id": "5bffc105603f0010ab2cdefe",
            "order": 6,
            "title": "archived",
            "color": "#aaa",
            "company_id": "5b94e03979f9b308ffa9c60e",
            "type": "regular"
          }
        ];

        store.commit('statuses/init', statuses);

        if (config.useLocalStorage) {
            let fileData = localStorage.getItem('doculator');

            if (fileData) {
                file = JSON.parse(fileData);

                if (config.askForLocalStorage) {
                    store.commit('confirm', {
                        message: 'There is Doculator data in the local storage. Do you want to load it?',
                        callback: localStorageCallback
                    });
                } else {
                    localStorageCallback(file.state);
                }
            } else {
                store.commit('message', {
                    message: `
                        Welcome to Doculater. 
                        <br><br>
                        We are in beta, which means that you are working in the backend-less mode. Your work is automatically saved in the so called <i>local storage</i>.
                        This is browser based. Each time you come back on this computer, I will import that data.
                        <br><br>
                        You can also export and import your data at any time, via the menu in the top right.
                        `
                });

                let company = {};
                company._id = getObjectId();
                store.commit('initCompany', company);
            }
        }
    }
};

bootstrapVue();


