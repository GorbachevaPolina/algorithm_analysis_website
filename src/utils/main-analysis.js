import * as stat from 'simple-statistics'
import regression from 'regression';
let quantile = require( '@stdlib/stats-base-dists-beta-quantile' );

export const analysis = async (params) => {
    let {
        input_lengths,
        left_segment,
        probability,
        results,
        right_segment_exp,
        right_segment_res,
        step
    } = params;

    let normalised_results = []
    let min_array = [], max_array = []
    for (let i = 0; i < results.length; i++) {
        min_array.push(Math.min(...results[i]))
        max_array.push(Math.max(...results[i]))
        normalised_results.push(results[i].map((item) => {
            return (item - min_array[i]) / (max_array[i] - min_array[i])
        }))
    }

    let t = [], s = [], regression_data_t = [], regression_data_s = []
    let min_regression_data = [], max_regression_data = []

    for (let i = 0; i < results.length; i++) {
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

    let count = +right_segment_exp + +step;
    while (count <= +right_segment_res) {
        t.push(regression_t.predict(count)[1])
        s.push(regression_s.predict(count)[1])

        min_array.push(regression_min.predict(count)[1])
        max_array.push(regression_max.predict(count)[1])

        count += +step
    }

    let alpha = [], beta = [], x_gamma = [], f_gamma = []
    for (let i = 0; i < t.length; i++) {
        alpha.push(t[i] / s[i] * (t[i] - t[i] * t[i] - s[i]))
        beta.push((1-t[i]) / s[i] * (t[i] - t[i] * t[i] - s[i]))
        x_gamma.push(quantile(+probability, alpha[i], beta[i]))
        f_gamma.push(min_array[i] + x_gamma[i] * (max_array[i] - min_array[i]))
    }

    return [alpha, beta, x_gamma, f_gamma]
}