import { USER_CART } from "../actions/variables";

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
        default:
            return {
                ...state
            }
    }
}