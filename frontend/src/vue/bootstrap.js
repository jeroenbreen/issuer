import Vue from 'vue';
import VueRouter from 'vue-router'
import VueResource from 'vue-resource';
import theStore from './store'

// components
import app from './app';
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
import {dateFormatter} from './filters/date-formatter';
import {documentIdFormatter} from './filters/document-id-formatter';
import VueCurrencyFilter from 'vue-currency-filter'

// // directives
import {scrimDirective} from './directives/scrim'

// google material for Vue
import VueMaterial from 'vue-material'
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


const bootstrapVue = function(response) {
    const store = theStore;
    theStore.commit('initCompany', response.company);
    theStore.commit('users/init', response.users);
    theStore.commit('clients/init', response.clients);
    theStore.commit('projects/init', response.projects);
    theStore.commit('repositories/init', response.repositories);
    theStore.commit('templates/init', response.templates);
    theStore.commit('documents/init', response.documents);

    theStore.commit('users/setCurrent', theStore.state.users.all[0]);
    theStore.dispatch('issues/read', theStore.state.users.current.githubKey);


    new Vue({
        el: '#app',
        store,
        router,
        components: {
            app
        },
        template: '<app/>'
    });
};

export {bootstrapVue};

