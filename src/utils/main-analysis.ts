import * as stat from 'simple-statistics'
import regression from 'regression';
import { TMainState } from '../services/reducers/calculations-file';
import { TMainAnalysisResults } from './types/types';
let quantile = require( '@stdlib/stats-base-dists-beta-quantile' );

export const analysis = async (params: TMainState): Promise<TMainAnalysisResults[]> => {
    let {
        left_segment,
        probability,
        results,
        right_segment_exp,
        right_segment_res,
        step
    } = params;

    let input_lengths = []
    for (let i = 0; i < (+right_segment_exp - +left_segment + 1); i += +step) {
        input_lengths.push(i)
    }
    let normalised_results: number[][] = []
    let min_array: number[] = [], max_array: number[] = []
    for (let i = 0; i < results!.length; i++) {
        min_array.push(Math.min(...results![i].map(item => +item)))
        // min_array.push(Math.min(...results[i].filter(item => +item)));
        max_array.push(Math.max(...results![i].map(item => +item)))
        normalised_results.push(results![i].map((item) => {
            return (+item - min_array[i]) / (max_array[i] - min_array[i])
        }))
    }

    let t = [], s = [], regression_data_t: [number, number][] = [], regression_data_s: [number, number][] = []
    let min_regression_data: [number, number][] = [], max_regression_data: [number, number][] = []

    for (let i = 0; i < results!.length; i++) {
        min_regression_data.push([input_lengths[i], min_array[i]])
        max_regression_data.push([input_lengths[i], max_array[i]])

        t.push(stat.mean(normalised_results[i]));
        s.push(stat.variance(normalised_results[i]));

        regression_data_t.push([input_lengths[i], t[i]]);
        regression_data_s.push([input_lengths[i], s[i]]);
    }

    let regression_t = regression.exponential(regression_data_t, {precision: 15})
    let regression_s = regression.exponential(regression_data_s, {precision: 15})
    let regression_min = regression.exponential(min_regression_data, {precision: 15})
    let regression_max = regression.exponential(max_regression_data, {precision: 15})

    let count = +left_segment;
    let t_regression = [], s_regression = [], min_regression = [], max_regression = []
    while (count <= +right_segment_res) {
        t_regression.push(regression_t.predict(count)[1])
        s_regression.push(regression_s.predict(count)[1])

        min_regression.push(regression_min.predict(count)[1])
        max_regression.push(regression_max.predict(count)[1])

        count += +step
    }

    let alpha = [], beta = [], x_gamma = [], f_gamma = []
    for (let i = 0; i < t_regression.length; i++) {
        alpha.push(t_regression[i] / s_regression[i] * (t_regression[i] - t_regression[i] * t_regression[i] - s_regression[i]))
        beta.push((1-t_regression[i]) / s_regression[i] * (t_regression[i] - t_regression[i] * t_regression[i] - s_regression[i]))
        x_gamma.push(quantile(+probability, alpha[i], beta[i]))
        f_gamma.push(min_regression[i] + x_gamma[i] * (max_regression[i] - min_regression[i]))
    }

    let result_data = [];
    count = 0
    for (let i = +left_segment; i <= +right_segment_res; i += +step) {
        result_data.push({
            name: i,
            alpha: alpha[count],
            beta: beta[count],
            x_gamma: x_gamma[count],
            f_gamma: f_gamma[count],
            max_regression: max_regression[count]
        })
        count++;
    }


    return result_data
}