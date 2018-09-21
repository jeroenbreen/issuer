const state = {
    document: {
        dictionary: {
            invoice: 'Factuur',
            subject: 'Betreft',
            footer: 'Gelieve dit bedrag binnen vier weken over te maken onder vermelding van factuurnummer op NL 30 TRIO 033 876 7924.<br><b>Let op dit is een nieuw rekeningnummer!</b>'
        },
        logo: {
            src: 'https://office.innouveau.com/print/logo-print.png',
            left: 0,
            top: 0,
            width: 100
        },
        margin: {
            top: 75,
            right: 80,
            bottom: 60,
            left: 80
        },
        addresses: {
            borderTop: 1,
            top: 140
        },
        content: {
            top: 250
        },
        subject: {
            borderTop: 1,
            borderBottom: 1,
        },
        footerText: {
            top: 540,
            borderTop: 1,
            borderBottom: 1,
        },
        footerImage: {
            image: true,
            imgSrc: 'https://office.innouveau.com/print/slogan.png',
            width: 120,
            top: 590
        },
        official: {
            top: 730
        }
    }
};



const getters = {

};

const actions = {

};

const mutations = {

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}