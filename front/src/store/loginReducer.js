//TODO: falta reducer de update de datos de usuario y foto

export default function loginReducer(state = null, action) {
    console.log('store says:', action.type)
    switch (action.type) {
        case 'login':
            return action.data
        case 'update-user':
            console.log('Update from', state, 'to', action.data)
            return {
                ...state,
                usuario: action.data
            }
        case 'logout':
            return null
        default:
            return state
    }
}
