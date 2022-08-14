import { DELETE_CART_BOOK, USER_CART } from "../actions/variables";

const initialState = {
    cartBooks: []
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
        default:
            return {
                ...state
            }
    }
}