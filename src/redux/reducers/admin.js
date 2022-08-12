import {GET_ALL_USERS, GET_USERS_BY_NAME} from '../actions/variables'

let initialState = {
    allUsers: [],
    allUsersByName: [],
}

export default function root(state = initialState, actions){
    switch (actions.type) {
        case GET_ALL_USERS:
            return {
                ...state,
                allBooks: actions.payload
            }
        case GET_USERS_BY_NAME:
            return {
                ...state,
                allUsersByName: actions.payload
            }
        default:
            return {...state}
    }
}