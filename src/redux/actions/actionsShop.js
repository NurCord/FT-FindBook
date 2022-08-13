import { GET_PRICE_ITEM, LESS_COUNT_ITEM, SUM_COUNT_ITEM } from "./variables";
import axios from 'axios'

export let priceItem = (id) => async(dispatch)=>{
    try {
        let bookByID = (await axios.get(`/books/${id}`)).data;
        dispatch({
            type: GET_PRICE_ITEM,
            payload: {book: bookByID, id: id}
        })
    } catch (error) {
        alert(error)
    }
}

export let sumCountItem = () => {
    return {
        type: SUM_COUNT_ITEM
    }
}

export let lessCountItem = () => {
    return {
        type: LESS_COUNT_ITEM
    }
}