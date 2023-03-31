export const SET_FILE: "SET_FILE" = "SET_FILE"

export type TPreAnalysisAction = {
    readonly type: typeof SET_FILE,
    readonly results: string[] | null
}