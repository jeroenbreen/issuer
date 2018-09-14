import Vue from 'vue';


const clientDetailsComponent = Vue.component('client-detail', {
    props: ['client'],
    template: `
        <div class="employee-details">
            <input v-model="client.companyName" placeholder="Company Name"><br>
            <input v-model="client.contactFirstName" placeholder="Contact First Name"><br>
            <input v-model="client.contactLastName" placeholder="Contact Last Name"><br>
            <input v-model="client.street" placeholder="Street"><br>
            <input v-model="client.postcode" placeholder="Postcode"><br>
            <input v-model="client.city" placeholder="City"><br><br>
            <input v-model="client.email" placeholder="Email"><br><br>
            <input v-model="client.telephone" placeholder="Telephone"><br><br>
            <input v-model="client.homepage" placeholder="Homepage"><br><br>
            <input v-model.number="client.rate" placeholder="Rate" type="number"><br><br>
        </div>
    `
});

export {clientDetailsComponent}

