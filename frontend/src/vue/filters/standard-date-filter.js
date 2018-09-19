import Vue from 'vue';
import format from 'date-fns/format'

const standardDateFilter = Vue.filter('standardDate', function (date) {
    return format(date, 'YYYY/MM/DD');
});

export {standardDateFilter}