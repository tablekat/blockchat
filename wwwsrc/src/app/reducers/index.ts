import { combineReducers } from 'redux'
import greetings from './example';

const appReducer = combineReducers({
    greetings,
    // add other reducers here
})

export default appReducer
