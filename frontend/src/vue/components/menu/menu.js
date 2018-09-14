import Vue from 'vue';


const menuComponent = Vue.component('menubar', {
    methods: {

    },
    template: `
        <div class="menu">
            <ul class="menu__index">
                <li>
                    <router-link to="/company">Company</router-link>
                </li>
                <li>
                    <router-link to="/employees">Employees</router-link>
                </li>
                <li>
                    <router-link to="/">Settings</router-link>
                </li>
            </ul>
                
            <ul class="menu__index">
                <li>
                    <router-link to="/clients">Clients</router-link>
                </li>
                 <li>
                    <router-link to="/">Projects</router-link>
                </li>
                 <li>
                    <router-link to="/">Documents</router-link>
                </li>
                <li>
                    <router-link to="/">Todo's</router-link>
                </li>
            </ul>
            
            <ul class="menu__index">
                <li>
                    <router-link to="/">Issues</router-link>
                </li>
            </ul>
        </div>      
    `
});

export {menuComponent}

