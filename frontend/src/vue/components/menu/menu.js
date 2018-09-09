import Vue from 'vue';


const menuComponent = Vue.component('menubar', {
    methods: {

    },
    template: `
        <div class="menu">
            <div class="menu__title">
                Menu
            </div>
            <div class="menu__index">
                <router-link to="/company">Company</router-link>
            </div>
        </div>      
    `
});

export {menuComponent}

