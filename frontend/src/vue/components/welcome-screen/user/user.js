import Vue from 'vue';

const userComponent = Vue.component('user', {
    data: function(){
        return {};
    },
    props: ['user'],
    template: `
        <div class="user">
            <div class="avatar" v-bind:style="{ 'background-image': 'url(' + user.thumbnail + ')' }"></div>
            {{user.getFullName()}}
        </div>
    `
});

export {userComponent}

