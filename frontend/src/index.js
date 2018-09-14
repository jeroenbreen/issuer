import $ from 'jquery';


import {bootstrapVue} from './vue/bootstrap';
import {bootstrapReact} from './react/bootstrap';

window.settings = {
    clientFormat: '3zeros'
};


$.ajax({
    'url' : (config.backend + 'bootstrap'),
    'headers': {
        'Accept': 'application/json'
    }
}).done(function(response){
    console.log(response);


    switch (config.framework) {
        case 'vue':
            bootstrapVue(response);
            break;
        case 'react':
            bootstrapReact(model);
            break;
    }
});




