import { combineReducers } from 'redux';
import usersReducer from './users';
import currentUser from './current-user';


const allReducers = {
    currentUser: currentUser,
    users: usersReducer
};

const rootReducer = combineReducers(allReducers);

export default rootReducer;