import {combineReducers} from 'redux'
import root from './books'
import genre from './genres'
import admin from './admin'

const reducers = combineReducers({
    root: root,
    genre: genre,
    admin: admin
})

export default reducers