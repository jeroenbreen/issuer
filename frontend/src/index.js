import $ from 'jquery';


import {bootstrapVue} from './vue/bootstrap';
import {bootstrapReact} from './react/bootstrap';


$.ajax({
    'url' : (config.backend + 'bootstrap'),
    'headers': {
        'Accept': 'application/json'
    }
}).done(function(response){
    switch (config.framework) {
        case 'vue':
            bootstrapVue(response);
            break;
        case 'react':
            bootstrapReact(model);
            break;
    }
});




