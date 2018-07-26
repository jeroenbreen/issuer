import $ from 'jquery';
import {App} from "./models/App";


import {bootstrapVue} from './vue/bootstrap';
import {bootstrapReact} from './react/bootstrap';


$.ajax({
    'url' : (config.backend + 'bootstrap'),
    'headers': {
        'Accept': 'application/json'
    }
}).done(function(response){
    let model = new App();
    window.app = model;
    app.bootstrap(response);

    console.log(window.app);

    switch (config.framework) {
        case 'vue':
            bootstrapVue(model);
            break;
        case 'react':
            bootstrapReact(model);
            break;
    }
});




