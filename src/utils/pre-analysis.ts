import * as stat from 'simple-statistics'
import { TPreResults } from './types/types';
var betainc = require( '@stdlib/math-base-special-betainc' );
var chiSquaredTest = require('chi-squared-test');

export const analysis = async (results: string[]): Promise<TPreResults> => {

    let min_value = Math.min(...results.map(item => +item));
    let max_value = Math.max(...results.map(item => +item));

    let normalised_results = results.map((item) => (+item - min_value) / (max_value - min_value))

    let k = Math.ceil(Math.sqrt(results.length))

    let h = (Math.max(...normalised_results.filter((item => item !== 1))) - Math.min(...normalised_results.filter((item) => item !== 0)))/k, count = 0;
    let frequency = [], hist_data = [];
    let s = 0, f = Math.min(...normalised_results.filter((item) => item !== 0)) + count * h

    let mean = stat.mean(normalised_results);
    let variance = stat.variance(normalised_results);
    let alpha = mean / variance * (mean - mean * mean - variance)
    let beta = (1 - mean) / variance * (mean - mean * mean - variance)
    
    let theoretical_frequency = []

    while (count <= k) {
        frequency.push(0)
        for (let j = 0; j < results.length; j++) {
            if (normalised_results[j] <= f && normalised_results[j] > s) {
                frequency[count] += 1
            } 
        }
        frequency[count] /= results.length;
        if (count === 0) {
            theoretical_frequency.push(betainc(f, alpha, beta))
        } else {
            theoretical_frequency.push(betainc(f, alpha, beta) - betainc(s, alpha, beta))
        }
        hist_data.push({
            name: count,
            data: frequency[count],
            th_data: theoretical_frequency[count]
        })
        count++; 
        s = f;
        f = Math.min(...normalised_results.filter((item) => item !== 0)) + count * h
    }

    let cut_th_data = theoretical_frequency.filter(item => item !== 0)
    let cut_data = frequency.slice(0, cut_th_data.length)

    let chi_squared = chiSquaredTest(cut_data, cut_th_data, 3)
    return [hist_data, chi_squared.probability]
      
}