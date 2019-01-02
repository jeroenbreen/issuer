const state = {
    template_invoice_id: '',
    template_quotation_id: '',
    documentIdFormat: '3zeros',
    clientIdFormat: 'roman',
    standardRate: 70,
    standardCurrency: 'EUR',
    viewModusCompact__overall: true,
    viewModusCompact__clients: false,
    viewModusCompact__projects: false,
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
    },
    setViewModus(state, payload) {
        state['viewModusCompact__' + payload.type] = payload.value;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}