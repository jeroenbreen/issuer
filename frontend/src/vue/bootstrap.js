import Vue from 'vue';
import VueRouter from 'vue-router'
import theStore from './store'

// components
import {topbarComponent} from './components/topbar/topbar';
import {menuComponent} from './components/menu/menu';
import {welcomeScreenComponent} from './components/welcome-screen/welcome-screen';
import {companyComponent} from './components/pages/company/company';
import {employeesComponent} from './components/pages/employees/employees';
import {employeeCreateComponent} from './components/pages/employees/employee-create/employee-create';
import {employeeUpdateComponent} from './components/pages/employees/employee-update/employee-update';

Vue.use(VueRouter);

// routing
const routes = [
    { path: '/company', component: companyComponent },
    { path: '/employees', component: employeesComponent },
    { path: '/employees/new', component: employeeCreateComponent },
    { path: '/employees/:id', component: employeeUpdateComponent }
];
const router = new VueRouter({
    routes
});

const bootstrapVue = function(response) {


    const store = theStore;
    theStore.commit('users/init', response.users);
    theStore.commit('initCompany', response.company);



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

