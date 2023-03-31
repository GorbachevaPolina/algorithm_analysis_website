import { SET_FILE, TPreAnalysisAction } from "../actions/pre-analysis"

type TPreState = {
    results: string[] | null
}

const initialState: TPreState = {
    results: null
}

export const preAnalysisReducer = (state = initialState, action: TPreAnalysisAction): TPreState => {
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