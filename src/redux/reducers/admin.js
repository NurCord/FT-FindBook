import {GET_ALL_USERS, GET_USERS_BY_NAME, GET_USER, ORDER_BY_NAME, ORDER_BY_BOOKS, BOOK_DETAIL} from '../actions/variables'

let initialState = {
    userDetail:{},
    bookDetail: {},
    allUsers: [],
    allUsersByName: [],
    orderUsers: "",
    orderBooks: "",
}

export default function root(state = initialState, actions){
    switch (actions.type) {
        case GET_ALL_USERS:
            return {
                ...state,
                allUsers: actions.payload.users?.sort((a,b)=>{
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (a.name < b.name) {
                            return -1;
                        }
                        return 0;
                })
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
                    img:actions.payload.url,
                    status: actions.payload.status
                }
            }
        case ORDER_BY_NAME:
            if(actions.payload !== "notOrder"){
                return {
                    ...state,
                    orderUsers: actions.payload,
                }
            } else {
                return {
                    ...state,
                    orderUsers: "notOrder",
                }
            }
        case ORDER_BY_BOOKS:
            if(actions.payload !== "notOrder"){
                return {
                    ...state,
                    orderUsers: actions.payload,
                }
            } else {
                return {
                    ...state,
                    orderUsers: "notOrder",
                }
            }
        case BOOK_DETAIL:
            return {
                ...state,
                bookDetail: actions.payload
        }
        default:
            return {...state}
    }
}