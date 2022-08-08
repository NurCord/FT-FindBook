import {combineReducers} from 'redux'
import root from './books'
import genre from './genres'

const reducers = combineReducers({
    root: root,
    genre: genre
})

export default reducers