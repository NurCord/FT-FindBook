import {GET_USER_PANEL, GET_BOOKS_PANEL, GET_DETAIL_BOOK_PANEL, USER_FAVO, DELETE_FAVO_BOOK, DELETE_ALL_FAVO_BOOKS, GET_USER_ORDERS_BY_ID, GET_USER_SALES_BY_ID} from '../actions/variables'

let initialState = {
    userDetail:{},
    bookDetail: {},
    books: [],
    history: [],
    favoBooks: [],
    orderDetail: {},
    saleDetail: {}
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
        case USER_FAVO:
            return {
                ...state,
                favoBooks: actions.payload
            }
        case DELETE_FAVO_BOOK:
            return {
                ...state,
                favoBooks: state.cartBooks.filter((book) => book.id !== actions.payload)
            }
        case DELETE_ALL_FAVO_BOOKS:
            return{
                ...state,
                favoBooks: []
            }
        case GET_USER_ORDERS_BY_ID:
            return{
               ...state,
                orderDetail: actions.payload
            }
        case GET_USER_SALES_BY_ID:
            return{
                ...state,
                saleDetail: actions.payload
            }
        default:
            return {...state}
    }
}