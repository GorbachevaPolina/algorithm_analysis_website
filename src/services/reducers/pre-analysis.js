import { SET_FILE } from "../actions/pre-analysis"

const initialState = {
    results: null
}

export const preAnalysisReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_FILE: {
            return {
                ...state,
                results: action.results
            }
        }
        default: {
            return state
        }
    }
}