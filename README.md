# Automated system for evaluating the algorithm complexity
Link: https://algorithm-analysis-gp.netlify.app/

## Description
The system is created for final qualifying work. The system accepts a file with data and completes confidence analysis of algorithm complexity. Output data - graphs of alpha, beta, left quantile of beta distribution and complexity. 

## Technologies
* React
* Redux
* Libraries: recharts, regression, simple-statistics

## How to use
<b>Preliminary analysis</b> <br/>
Upload a file with the results of the experiment. A file should contain results written in a line. The system will build a histogram of frequencies and calculate chi-squared test. <br/><br/>
<b>Main analysis</b> <br/>
Upload a file with the results of the experiment and configure the parameters for the analysis. The file should contain results for multiple input lengths, each one on a new line. The system will build graphs for alpha, beta, left quantile and complexity. 

To test the system you can use files pre_sort.txt and pre_dinic.txt for Preliminary analysis and output_sort_new.txt and output_dinic_new.txt for Main analysis. Those file can be found in test_data folder.
