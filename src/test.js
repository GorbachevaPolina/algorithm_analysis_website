import * as stat from 'simple-statistics'
let quantile = require( '@stdlib/stats-base-dists-beta-quantile' );


function insertionSort(inputArr) {
    let n = inputArr.length;
        for (let i = 1; i < n; i++) {
            // Choosing the first element in our unsorted subarray
            let current = inputArr[i];
            // The last element of our sorted subarray
            let j = i-1; 
            while ((j > -1) && (current < inputArr[j])) {
                inputArr[j+1] = inputArr[j];
                j--;
            }
            inputArr[j+1] = current;
        }
    return inputArr;
}

export const test = async (func) => {
    console.log("starting test")
    let results = []
    let count = 0
    let wrap = s => "{ return " + func + " };" 
    let func_test = new Function(wrap(func))
    
    for (let i = 100; i <= 150; i+=10) {
        results.push([])
        let array = Array.from({length: i}, () => Math.floor(Math.random() * 500));
        console.log(`on ${i} iteration`)
        for (let j = 0; j < 50; j++) {
            const start = performance.now();
            // await insertionSort(array)
            // eval(func)
            func_test.call( null ).call( null, array  );
            const end = performance.now();
            results[count].push(end-start)
        }
        count += 1
    }

    let t_array = [], s_array = [], alpha = [], beta = [], gamma = [], res = []

    for (let i = 0; i <=5; i++) {
        let s = 0, t = 0;
        let min = Math.min(...results[i])
        let max = Math.max(...results[i])
        // for (let j = 0; j < 50; j++) {
        //     t += (results[i][j] - min) / (max - min)
        // }
        // t /= 50
        // for (let j = 0; j < 50; j++) {
        //     s += ((results[i][j] - min) / (max - min) - t) * ((results[i][j] - min) / (max - min) - t)
        // }
        // s /= 49 
        t = stat.mean(results[i])
        s = stat.variance(results[i])
        t_array.push(t)
        s_array.push(s)
        console.log(`s: ${s} and t: ${t}`)

        alpha.push(t / s * (t - t * t - s))
        beta.push((1-t) / s * (t - t * t - s))

        console.log(`a: ${alpha[i]} and b: ${beta[i]}`)

        gamma.push(quantile(0.95, alpha[i], beta[i]))

        res.push(min + gamma[i] * (max - min))
        console.log("gamma ", gamma[i])

        console.log(max, res[i])
    }
}