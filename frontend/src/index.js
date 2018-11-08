import $ from 'jquery';
import {bootstrapVue} from './vue/bootstrap';

function getBackendData() {
    const url = config.backend + 'bootstrap';

    $.ajax({
        'url' : url,
        'headers': {
            'Accept': 'application/json'
        }
    }).done(function(response){
        getGitData(response);
    });
}



function getGitData(response) {

    if (response.company && response.company.githubHandle && response.company.githubKey) {
        const company = response.company;
        const url = 'https://api.github.com/user/repos?per_page=500&access_token=' + company.githubKey;

        $.ajax({
            'url' : url,
            'headers': {
                'Accept': 'application/json'
            }
        }).done(function(repositories){
            response.repositories = repositories;
            console.log(response);
            bootstrapVue(response);
        });
    } else {
        console.log('No github data present');
    }
}


getBackendData();


