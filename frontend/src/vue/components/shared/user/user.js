import Vue from 'vue';
import {avatarComponent} from '../../shared/avatar/avatar';


const userComponent = Vue.component('user', {
    props: ['user'],
    template: `
        <div class="user">
            <avatar v-bind:user="user"></avatar>
            {{user.getFullName()}}
        </div>
    `
});

export {userComponent}

