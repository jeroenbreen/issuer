import Vue from 'vue';

const avatarComponent = Vue.component('avatar', {
    props: ['user'],
    template: `
        <div class="avatar" v-bind:style="{ 'background-image': 'url(' + user.thumbnail + ')' }"></div>
    `
});

export {avatarComponent}

