import {GET_ALL_USERS, GET_USERS_BY_NAME, GET_USER} from '../actions/variables'

let initialState = {
    userDetail:{},
    allUsers: [],
    allUsersByName: [],
}

export default function root(state = initialState, actions){
    switch (actions.type) {
        case GET_ALL_USERS:
            return {
                ...state,
                allUsers: actions.payload.users
            }
        case GET_USERS_BY_NAME:
            return {
                ...state,
                allUsersByName: actions.payload
            }
        case GET_USER:
            return {
                ...state,
                userDetail: {
                    nameUser:actions.payload.username,
                    name:actions.payload.name, 
                    surname:actions.payload.lastname,
                    email:actions.payload.email,
                    img:actions.payload.url
                }
            }
        default:
            return {...state}
    }
}