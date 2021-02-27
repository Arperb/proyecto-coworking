export default function registerReducer (state = null,action) {
    switch (action.type) {
        case 'registro':
            return action.data
        default:
            return state
    }
}