const state = {
    template_id: '5bee9f703b6286106a2f6c34',
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