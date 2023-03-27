import { SET_FILE, SET_PRE_ANALYSIS_PARAMETER } from "../actions/pre-analysis"

const initialState = {
    results: null,

    input_length: null
}

export const preAnalysisReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_FILE: {
            return {
                ...state,
                results: action.results
            }
        }
        case SET_PRE_ANALYSIS_PARAMETER: {
            return {
                ...state,
                input_length: action.input
            }
        }
        default: {
            return state
        }
    }
}