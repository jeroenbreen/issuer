import Vue from 'vue';
import {avatarComponent} from '../shared/avatar/avatar';


const topbarComponent = Vue.component('topbar', {
    methods: {
        getCurrentUser() {
            return this.$store.state.users.currentUser;
        }
    },
    props: ['model'],
    template: `
        <div class="topbar">
            Welcome
            <avatar v-bind:user="getCurrentUser()" v-if="getCurrentUser()"></avatar>
        </div>
    `
});

export {topbarComponent}

