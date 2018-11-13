import Vue from 'vue';
import VueRouter from 'vue-router'
import VueResource from 'vue-resource';
import theStore from './store'

// filters
import {standardDateFilter} from './filters/standard-date-filter';
import {idFormatter} from './filters/id-formatter';
import VueCurrencyFilter from 'vue-currency-filter'
//
// // directives
// import {scrimDirective} from './directives/scrim'

// components
import topBar from '@components/layout/top-bar';
import menuBar from '@components/layout/menu-bar';
import document from './components/document/document';
// import {welcomeScreenComponent} from './components/welcome-screen/welcome-screen';
// import {modalComponent} from './components/modal/modal';
// import {companyComponent} from './components/pages/company/company';
// import {settingsComponent} from './components/pages/settings/settings';
// import {employeesComponent} from './components/pages/employees/employees';
// import {employeeCreateComponent} from './components/pages/employees/employee-create/employee-create';
// import {employeeUpdateComponent} from './components/pages/employees/employee-update/employee-update';
// import {clientsComponent} from './components/pages/clients/clients';
// import {clientCreateComponent} from './components/pages/clients/client-create/client-create';
// import {clientUpdateComponent} from './components/pages/clients/client-update/client-update';
// import {projectsComponent} from './components/pages/projects/projects';
// import {projectCreateComponent} from './components/pages/projects/project-create/project-create';
// import {projectUpdateComponent} from './components/pages/projects/project-update/project-update';
// import {issuesComponent} from './components/pages/issues/issues';
// import {templatesComponent} from './components/pages/templates/templates';

// google material for Vue
import VueMaterial from 'vue-material'
Vue.use(VueMaterial);

// draggable
import VueDragResize from 'vue-drag-resize'
Vue.component('vue-drag-resize', VueDragResize);

import VueDraggableResizable from 'vue-draggable-resizable'
Vue.component('vue-draggable-resizable', VueDraggableResizable);



import {Document} from './store/models/Document'

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
const routes = [];
// const routes = [
//     { path: '/', component: companyComponent },
//     { path: '/company', component: companyComponent },
//     { path: '/settings', component: settingsComponent },
//     { path: '/employees', component: employeesComponent },
//     { path: '/employees/new', component: employeeCreateComponent },
//     { path: '/employees/:id', component: employeeUpdateComponent },
//     { path: '/clients', component: clientsComponent },
//     { path: '/clients/new', component: clientCreateComponent },
//     { path: '/clients/:id', component: clientUpdateComponent },
//     { path: '/projects', component: projectsComponent },
//     { path: '/projects/new', component: projectCreateComponent },
//     { path: '/projects/:id', component: projectUpdateComponent },
//     { path: '/issues', component: issuesComponent },
//     { path: '/templates', component: templatesComponent }
// ];
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
            topBar, menuBar, document
        },
        methods: {
            hasCurrentUser() {
                return this.$store.state.users.current !== null;
            },
            hasDocument() {
                return this.$store.state.documents.current !== null;
            },
            showModal() {
                return this.$store.state.modal.show;
            }
        },
        template: `
            <div class="main">
                <top-bar/>
                <div class="content">
                    <menu-bar/>
                    <router-view></router-view>
                </div>
                
                <document v-if="hasDocument()"/>
            </div>
        `
    });
};

export {bootstrapVue};

