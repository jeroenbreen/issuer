import Vue from 'vue';


const menuComponent = Vue.component('menubar', {
    methods: {

    },
    template: `
        <div class="menu">
            <div class="menu__title">
                Menu
            </div>
            <ul class="menu__index">
                <li>
                    <router-link to="/company">Company</router-link>
                </li>
                <li>
                    <router-link to="/employees">Employees</router-link>
                </li>
            </ul>
        </div>      
    `
});

export {menuComponent}

