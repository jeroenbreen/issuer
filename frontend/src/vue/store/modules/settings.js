const state = {
    template_id: '5bec4b1b9334193529e8a753',
    documentIdFormat: '3zeros',
    clientIdFormat: '3zeros',
    standardRate: 70
};



const getters = {

};

const actions = {

};

const mutations = {
    update(state, settings) {
        for (let key in settings) {
            state[key] = settings[key];
        }
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}