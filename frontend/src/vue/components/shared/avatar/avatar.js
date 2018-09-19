import Vue from 'vue';

const avatarComponent = Vue.component('avatar', {
    props: ['user', 'size'],
    template: `
        <div class="avatar" v-bind:style="{ 'background-image': 'url(' + user.thumbnail + ')', 'width': size + 'px', 'height': size + 'px' }"></div>
    `
});

export {avatarComponent}

