import { GET_PRICE_ITEM, LESS_COUNT_ITEM, SUM_COUNT_ITEM, USER_CART } from "../actions/variables";

const initialState = {
    price: 0,
    count: 1,
    id: 0,
    cartBooks: []
}

export default function shop(state = initialState, actions){
    switch (actions.type) {
        case GET_PRICE_ITEM:
            console.log(actions.payload)
            console.log(state.count)
            return {
                ...state,
                price: actions.payload.book.price * state.count,
                id: actions.payload.id
            }
        case SUM_COUNT_ITEM:
            return {
                ...state,
                count: state.count + 1
            }    
        case LESS_COUNT_ITEM:
            return {
                ...state,
                count: state.count - 1
            }
        case USER_CART:
            return {
                ...state,
                cartBooks: actions.payload
            }
        default:
            return {
                ...state
            }
    }
}