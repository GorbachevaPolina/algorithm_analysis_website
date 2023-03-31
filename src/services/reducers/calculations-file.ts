import { SET_ANALYSIS_PARAMETERS, SET_CALCULATIONS_FILE, TMainAnalysisActions } from "../actions/calculations-file"

export type TMainState = {
    results: string[][] | null;
    left_segment: string,
    right_segment_exp: string,
    right_segment_res: string,
    step: string,
    probability: string,

    analysisStarted: boolean
}

const initialState: TMainState = {
    results: null,

    left_segment: "",
    right_segment_exp: "",
    right_segment_res: "",
    step: "",
    probability: "",

    analysisStarted: false
}

export const calculationsFileReducer = (state = initialState, action: TMainAnalysisActions): TMainState => {
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