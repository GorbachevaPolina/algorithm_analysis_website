import { combineReducers } from 'redux'
import { calculationsFileReducer } from './calculations-file'

export const rootReducer = combineReducers({
    calculationsFile: calculationsFileReducer
})