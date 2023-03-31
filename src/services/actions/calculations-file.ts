import { IInputs } from "../../utils/types/types"

export const SET_CALCULATIONS_FILE: "SET_CALCULATIONS_FILE" = "SET_CALCULATIONS_FILE"
export const SET_ANALYSIS_PARAMETERS: "SET_ANALYSIS_PARAMETERS" = "SET_ANALYSIS_PARAMETERS"

export interface ISetCalculationsFileAction {
    readonly type: typeof SET_CALCULATIONS_FILE,
    readonly results: string[][] | null
}

export interface ISetAnalysisParameters {
    readonly type: typeof SET_ANALYSIS_PARAMETERS,
    readonly inputs: IInputs,
    readonly started: boolean
}

export type TMainAnalysisActions = ISetAnalysisParameters | ISetCalculationsFileAction;