import { DELETE_ALL_CART_BOOKS, DELETE_CART_BOOK, GET_SESSION_ID, SOLD_OUT, USER_CART, GET_ALL_USER_ORDERS, BUTTON_STATUS, GET_ALL_USER_SALES} from "../actions/variables";

const initialState = {
    cartBooks: [],
    soldOut: false,
    orderList: [],
    salesList:[],
    buttonStatus: 'enabled'
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
            }else{
                return{
                    ...state
                }
            };
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
        case GET_ALL_USER_ORDERS:
            if(actions.payload.message === "No se han registrado operaciones" || actions.payload.message === "Usuario invalido"){
                return{
                    ...state,
                    orderList: []
                }
            }else{
                return{
                    ...state,
                    orderList: actions.payload
                }
            }
        case BUTTON_STATUS:
            if(actions.payload === "boton deshabilitado"){
                return{
                    ...state,
                    buttonStatus: "disabled"
                }
            }else{
                return{
                    ...state,
                    buttonStatus: "enabled"
                }
            }
        case GET_ALL_USER_SALES:{
            return{
                ...state,
                salesList: actions.payload.ventas
            }
        }
        default:
            return {
                ...state
            }
    }
}