import {GET_USER_PANEL, GET_BOOKS_PANEL, GET_DETAIL_BOOK_PANEL} from '../actions/variables'

let initialState = {
    userDetail:{},
    bookDetail: {},
    books: [],
    history: []
}

export default function root(state = initialState, actions){
    switch (actions.type) {
        case GET_USER_PANEL:
            return {
                ...state,
                userDetail: actions.payload
            }
        case GET_BOOKS_PANEL:
            return {
                ...state,
                books: actions.payload
            }
        case GET_DETAIL_BOOK_PANEL:
            return {
                ...state,
                bookDetail: actions.payload
            }
        default:
            return {...state}
    }
}