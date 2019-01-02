import _base from "./_base-module";

const state = {
    all: {
        template_invoice_id: '',
        template_quotation_id: '',
        documentIdFormat: '3zeros',
        clientIdFormat: 'roman',
        standardRate: 70,
        standardCurrency: 'EUR',
        viewModusCompact__overall: true,
        viewModusCompact__clients: false,
        viewModusCompact__projects: false,
    }
};



const getters = {
    getAll(state) {
        return state.all;
    }
};

const actions = {
    update(context, item){
        return _base.actions.update(context, item, 'settings');
    }
};

const mutations = {
    init(state, settings) {
        // todo remove check when backend also stores settings
        if (settings) {
            state.all = {...settings.all};
        }
    },
    update(state, settings) {
        for (let key in settings) {
            state.all[key] = settings[key];
        }
    },
    setViewModus(state, payload) {
        state.all['viewModusCompact__' + payload.type] = payload.value;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}