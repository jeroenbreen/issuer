import React from "react";
import ReactDOM from 'react-dom';

const bootstrapReact = function(model) {

    ReactDOM.render(
        <h1>Hello, world!</h1>,
        document.getElementById('app')
    );

};

export {bootstrapReact};

