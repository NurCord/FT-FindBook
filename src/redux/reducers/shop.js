import { DELETE_ALL_CART_BOOKS, DELETE_CART_BOOK, GET_SESSION_ID, SOLD_OUT, USER_CART, GET_ALL_USER_ORDERS } from "../actions/variables";

const initialState = {
    cartBooks: [],
    soldOut: false
}

export default function shop(state = initialState, actions){
    switch (actions.type) {
        case USER_CART:
            return {
                ...state,
                cartBooks: actions.payload
            }
        case DELETE_CART_BOOK:
            return {
                ...state,
                cartBooks: state.cartBooks.filter((book) => book.id !== actions.payload)
            }
        case GET_SESSION_ID:
            if(actions.payload === "Gracias por su compra"){
                return{
                    ...state,
                    cartBooks: [],
                    soldOut: true
                }
            }break;
        case SOLD_OUT:
            return{
                ...state,
                soldOut: false 
            }
        case DELETE_ALL_CART_BOOKS:
            return{
                ...state,
                cartBooks: []
            }
        default:
            return {
                ...state
            }
    }
}