import Vue from 'vue';
import VueRouter from 'vue-router'
import VueResource from 'vue-resource';
import theStore from './store'

// components
import {topbarComponent} from './components/topbar/topbar';
import {menuComponent} from './components/menu/menu';
import {welcomeScreenComponent} from './components/welcome-screen/welcome-screen';
import {companyComponent} from './components/pages/company/company';
import {employeesComponent} from './components/pages/employees/employees';
import {employeeCreateComponent} from './components/pages/employees/employee-create/employee-create';
import {employeeUpdateComponent} from './components/pages/employees/employee-update/employee-update';
import {clientsComponent} from './components/pages/clients/clients';
import {clientCreateComponent} from './components/pages/clients/client-create/client-create';
import {clientUpdateComponent} from './components/pages/clients/client-update/client-update';
import {projectsComponent} from './components/pages/projects/projects';
import {projectCreateComponent} from './components/pages/projects/project-create/project-create';
import {projectUpdateComponent} from './components/pages/projects/project-update/project-update';



Vue.use(VueRouter);
Vue.use(VueResource);

// routing
const routes = [
    { path: '/', component: companyComponent },
    { path: '/company', component: companyComponent },
    { path: '/employees', component: employeesComponent },
    { path: '/employees/new', component: employeeCreateComponent },
    { path: '/employees/:id', component: employeeUpdateComponent },
    { path: '/clients', component: clientsComponent },
    { path: '/clients/new', component: clientCreateComponent },
    { path: '/clients/:id', component: clientUpdateComponent },
    { path: '/projects', component: projectsComponent },
    { path: '/projects/new', component: projectCreateComponent },
    { path: '/projects/:id', component: projectUpdateComponent }
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



    new Vue({
        el: '#app',
        store,
        router,
        methods: {
            hasCurrentUser() {
                return this.$store.state.users.current !== null;
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
                
                <!--<welcome-screen v-if="!hasCurrentUser()"></welcome-screen>-->
            </div>
        `
    });
};

export {bootstrapVue};

