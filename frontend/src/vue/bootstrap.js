import Vue from 'vue';
import VueRouter from 'vue-router'
import VueResource from 'vue-resource';
import theStore from './store'

// filters
import {standardDateFilter} from './filters/standard-date-filter';

// directives
import {scrimDirective} from './directives/scrim'

// components
import {topbarComponent} from './components/topbar/topbar';
import {menuComponent} from './components/menu/menu';
import {welcomeScreenComponent} from './components/welcome-screen/welcome-screen';
import {documentComponent} from './components/document/document';
import {companyComponent} from './components/pages/company/company';
import {settingsComponent} from './components/pages/settings/settings';
import {employeesComponent} from './components/pages/employees/employees';
import {employeeCreateComponent} from './components/pages/employees/employee-create/employee-create';
import {employeeUpdateComponent} from './components/pages/employees/employee-update/employee-update';
import {clientsComponent} from './components/pages/clients/clients';
import {clientCreateComponent} from './components/pages/clients/client-create/client-create';
import {clientUpdateComponent} from './components/pages/clients/client-update/client-update';
import {projectsComponent} from './components/pages/projects/projects';
import {projectCreateComponent} from './components/pages/projects/project-create/project-create';
import {projectUpdateComponent} from './components/pages/projects/project-update/project-update';
import {issuesComponent} from './components/pages/issues/issues';

import {Document} from './store/models/Document'

Vue.use(VueRouter);
Vue.use(VueResource);

// routing
const routes = [
    { path: '/', component: companyComponent },
    { path: '/company', component: companyComponent },
    { path: '/settings', component: settingsComponent },
    { path: '/employees', component: employeesComponent },
    { path: '/employees/new', component: employeeCreateComponent },
    { path: '/employees/:id', component: employeeUpdateComponent },
    { path: '/clients', component: clientsComponent },
    { path: '/clients/new', component: clientCreateComponent },
    { path: '/clients/:id', component: clientUpdateComponent },
    { path: '/projects', component: projectsComponent },
    { path: '/projects/new', component: projectCreateComponent },
    { path: '/projects/:id', component: projectUpdateComponent },
    { path: '/issues', component: issuesComponent }
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

    theStore.commit('users/setCurrent', theStore.state.users.all[0]);
    theStore.dispatch('issues/read', theStore.state.users.current.githubKey);


    const document = {
        type: 'invoice',
        date: new Date(),

        userName: theStore.state.users.current.getFullName(),
        clientCompanyName: theStore.state.clients.all[0].companyName,
        clientContactName: theStore.state.clients.all[0].contactFirstName + theStore.state.clients.all[0].contactLastName,
        clientStreet: theStore.state.clients.all[0].street,
        clientPostcode: theStore.state.clients.all[0].postcode,
        clientCity: theStore.state.clients.all[0].city
    };
    console.log(document);
    theStore.commit('documents/setCurrent', new Document(document));



    new Vue({
        el: '#app',
        store,
        router,
        methods: {
            hasCurrentUser() {
                return this.$store.state.users.current !== null;
            },
            hasDocument() {
                return this.$store.state.documents.current !== null;
            }
        },
        template: `
            <div class="main">
                <topbar></topbar>
                <div class="content">
                    <menubar></menubar>
                    <router-view></router-view>
                </div>
                
                <document v-if="hasDocument()"></document>
                
                <welcome-screen v-if="!hasCurrentUser()"></welcome-screen>
            </div>
        `
    });
};

export {bootstrapVue};

