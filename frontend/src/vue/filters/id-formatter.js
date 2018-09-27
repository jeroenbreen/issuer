import Vue from 'vue';

const idFormatter = Vue.filter('formatId', function (type, value) {
    switch (type) {
        case '3zeros':
            let s = String(value);
            while (s.length < (3 || 2)) {s = "0" + s;}
            return s;
    }
});

export {idFormatter}