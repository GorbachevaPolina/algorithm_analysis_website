import { SET_ANALYSIS_PARAMETERS, SET_CALCULATIONS_FILE } from "../actions/calculations-file"

const initialState = {
    results: null,

    left_segment: null,
    right_segment_exp: null,
    right_segment_res: null,
    step: null,
    probability: null,

    analysisStarted: false
}

export const calculationsFileReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_CALCULATIONS_FILE: {
            return {
                ...state,
                results: action.results
            }
        }
        case SET_ANALYSIS_PARAMETERS: {
            return {
                ...state,
                left_segment: action.inputs.left_segment,
                right_segment_exp: action.inputs.right_segment_exp,
                right_segment_res: action.inputs.right_segment_res,
                step: action.inputs.step,
                probability: action.inputs.probability,
                analysisStarted: action.started
            }
        }
        default: {
            return state
        }
    }
}