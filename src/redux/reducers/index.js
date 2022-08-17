import {combineReducers} from 'redux'
import root from './books'
import genre from './genres'
import admin from './admin'
import shop from './shop'
import user from './user'

const reducers = combineReducers({
    root: root,
    genre: genre,
    admin: admin,
    shop: shop,
    user: user
})

export default reducers