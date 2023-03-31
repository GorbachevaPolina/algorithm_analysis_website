export interface IInputs {
    left_segment: string;
    right_segment_exp: string ;
    right_segment_res: string ;
    step: string ;
    probability: string ;
}

export type TMainAnalysisResults = {
    name: number;
    alpha: number;
    beta: number; 
    x_gamma: number;
    f_gamma: number;
    max_regression: number;
}

export type THist = {
    name: number,
    data: number,
    th_data: number
}

export type TPreResults = [THist[], string]