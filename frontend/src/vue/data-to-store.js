
const dataToStore = function (store, data) {
    store.commit('initCompany', data.company);
    store.commit('users/init', data.users);
    store.commit('clients/init', data.clients);
    store.commit('projects/init', data.projects);
    store.commit('repositories/init', data.repositories);
    store.commit('templates/init', data.templates);
    store.commit('documents/init', data.documents);
    store.commit('statuses/init', data.statuses);

    store.commit('users/setCurrent', store.state.users.all[0]);
    store.dispatch('issues/read', store.state.users.current.githubKey);
};

export {dataToStore}