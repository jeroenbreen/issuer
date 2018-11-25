const state = {
    template_invoice_id: '5bfa8f5075a94303620a94f7',
    template_quotation_id: '5bf446a18a309c3da498bd0f',
    documentIdFormat: '3zeros',
    clientIdFormat: '3zeros',
    standardRate: 70,
    issues: false
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