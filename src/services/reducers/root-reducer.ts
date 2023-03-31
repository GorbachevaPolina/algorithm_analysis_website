import { combineReducers } from 'redux'
import { calculationsFileReducer } from './calculations-file'
import { preAnalysisReducer } from './pre-analysis'

export const rootReducer = combineReducers({
    calculationsFile: calculationsFileReducer,
    preAnalysis: preAnalysisReducer
})