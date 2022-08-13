import {combineReducers} from 'redux'
import root from './books'
import genre from './genres'
import admin from './admin'
import shop from './shop'

const reducers = combineReducers({
    root: root,
    genre: genre,
    admin: admin,
    shop: shop
})

export default reducers