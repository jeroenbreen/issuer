import $ from "jquery";

const storeToFile = function (theState) {
    let file = {},
        state = {},
        objs = ['company', 'settings'],
        ignore = ['modal', 'templateEditor', 'ui'];
    // todo write test

    for (let key in theState) {
        if (ignore.indexOf(key) === -1) {
            if (objs.indexOf(key) > -1) {
                state[key] = {...theState[key]};
            } else {
                state[key] = [];
                for (let item of theState[key].all) {
                    state[key].push(item.toBackend());
                }
            }
        }
    }
    file.type = 'doculator';
    file.version = '1.0.0';
    file.state = state;
    return file;
};


const dataToStore = function (store, data, commitFixed) {
    store.commit('settings/init', data.settings);
    store.commit('initCompany', data.company);
    store.commit('users/init', data.users);
    store.commit('clients/init', data.clients);
    store.commit('projects/init', data.projects);
    store.commit('templates/init', data.templates);
    store.commit('documents/init', data.documents);
    store.commit('users/setCurrent', store.state.users.all[0]);

    if (commitFixed) {
        store.commit('statuses/init', data.statuses);
    }
};

const getObjectId = function () {
    const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
        s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));
    return ObjectId();

    // return new Promise((resolve, reject) => {
    //     $.ajax({
    //         'url': (config.backend + 'get-object-id'),
    //         'type': 'GET',
    //         'headers': {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         }
    //     }).done(function(response){
    //         resolve(response);
    //     });
    // })
};


export {storeToFile, dataToStore, getObjectId}