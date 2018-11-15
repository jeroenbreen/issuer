import Vue from 'vue';
import format from 'date-fns/format'

const dateFormatter = Vue.filter('dateFormatter', function (date) {
    return format(date, 'YYYY/MM/DD');
});

export {dateFormatter}