import Vue from 'vue';


const kebabFormatter = Vue.filter('kebabFormatter', function (value) {
    let replaced = value.toLowerCase().replace(/[\W_]+/g, '-');
    return replaced;

});

export {kebabFormatter}