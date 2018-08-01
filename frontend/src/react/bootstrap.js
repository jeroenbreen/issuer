import React from "react";
import ReactDOM from 'react-dom';
import WelcomeScreen from './components/welcome-screen/welcome-screen';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './redux/reducers'

const store = createStore(rootReducer);

window.store = store;

function createInitialState(data) {
    for (let user of data.users) {
        store.dispatch({type: 'ADD_USER', payload: user });
    }
}

const bootstrapReact = function(model) {

    createInitialState(model);

    ReactDOM.render(
        <Provider store={store}>
            <WelcomeScreen></WelcomeScreen>
        </Provider>,
        document.getElementById('app')
    );

};

export {bootstrapReact};

