import * as stat from 'simple-statistics'
var betainc = require( '@stdlib/math-base-special-betainc' );
var chiSquaredTest = require('chi-squared-test');

export const analysis = async (results) => {

    let min_value = Math.min(...results);
    let max_value = Math.max(...results);

    let normalised_results = results.map((item) => (+item - min_value) / (max_value - min_value))

    let k = Math.ceil(Math.sqrt(results.length))
    // let k = Math.ceil(1 + 3.322 * Math.log10(results.length))

    let h = (Math.max(...normalised_results.filter((item => item !== 1))) - Math.min(...normalised_results.filter((item) => item !== 0)))/k, count = 0;
    let frequency = [], hist_data = [];
    // let s = Math.min(...normalised_results.filter((item) => item !== 0)), f = s + h
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

    // const testData = [0.003420240544, 0.003591813051, 0.003763385557, 0.003934958063, 0.004106530569, 0.004278103075, 0.004449675582, 0.004621248088, 0.004792820594, 0.0049643931, 0.005135965606, 0.005307538113, 0.005479110619, 0.005650683125, 0.005822255631, 0.005993828137]
    // const testA = 198.4086223, testB = 41697.29048
    // const testThF = testData.map((item, idx) => {
    //     if (idx == 0) return betainc(item, testA, testB)
    //     return betainc(item, testA, testB) - betainc(testData[idx-1], testA, testB)
    // })
    // console.log(testThF)
    let cut_th_data = theoretical_frequency.filter(item => item !== 0)
    let cut_data = frequency.slice(0, cut_th_data.length)

    let chi_squared = chiSquaredTest(cut_data, cut_th_data, 3)
    return [hist_data, chi_squared]
      
}