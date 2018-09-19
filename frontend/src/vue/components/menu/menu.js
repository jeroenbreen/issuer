import Vue from 'vue';


const menuComponent = Vue.component('menubar', {
    methods: {
        getCurrentUser() {
            return this.$store.state.users.current;
        }
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
                    <router-link to="/projects">Projects</router-link>
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
                    <router-link to="/issues">
                        Issues 
                        <avatar 
                            v-bind:user="getCurrentUser()" 
                            v-bind:size="24"></avatar>
                    </router-link>
                </li>
            </ul>
        </div>      
    `
});

export {menuComponent}

