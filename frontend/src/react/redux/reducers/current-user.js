export default function(state = '', action) {
    switch (action.type) {
        case 'SELECT_CURRENT_USER': {
            return action.payload
        }
        default:
            return state;
    }
}