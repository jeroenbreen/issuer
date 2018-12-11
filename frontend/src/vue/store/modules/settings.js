const state = {
    template_invoice_id: '5bfc588dfdbb1008c1b28db4',
    template_quotation_id: '5bf446a18a309c3da498bd0f',
    documentIdFormat: '3zeros',
    clientIdFormat: 'roman',
    standardRate: 70,
    standardCurrency: 'EUR',
    //
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