const state = {
    template_invoice_id: '5beed8f4d3ddfb12fd4e275e',
    template_quotation_id: '5befe6bb738f4a0421b82f74',
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