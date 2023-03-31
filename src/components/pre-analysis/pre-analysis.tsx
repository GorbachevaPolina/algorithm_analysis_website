import React, { useState, useEffect, FC } from 'react'
import { useSelector } from '../../utils/types/hooks'
import "./pre-analysis.scss"
import { analysis } from '../../utils/pre-analysis';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import { TPreResults } from '../../utils/types/types';

const PreAnalysis: FC = () => {
    const parameters = useSelector((store) => store.preAnalysis);
    const [canAnalyse, setCanAnalyse] = useState<boolean | null>(null)
    const [isDone, setIsDone] = useState<boolean>(false)
    const [resultData, setResultData] = useState<TPreResults | null>(null)

    const startAnalysis = async () => {
        if(parameters.results !== null) {
            setCanAnalyse(true)
            let results = await analysis(parameters.results)
            setResultData(results)
            setIsDone(true)
        }
    }

    useEffect(() => {
        if(parameters.results === null) {
            setCanAnalyse(false)
        } else {
            setCanAnalyse(true)
        }
    }, [parameters])

    useEffect(() => {
        if(canAnalyse) startAnalysis()
    }, [canAnalyse])

    return (
            <div className="pre-results-container">
            {
                canAnalyse === false ? 
                    <p>Ошибка в параметрах.</p> :
                    isDone ?
                    null :
                    <p>Пожалуйста, подождите. Проходит анализ</p> 
            }
            {
                resultData ?
                (
                    <>
                    <div className="pre-graph-container">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                        data={resultData[0]}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="data" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                    </div>
                    <p className='xi-result'>Результат функции ХИ2: {resultData[1]}</p>
                    <p>Если значение ХИ2 достаточно большое, то можно приступать к основному этапу.</p>
                    <Link to="/prepare-analysis" state={{fromMain: true}}><button>К основному этапу</button></Link>
                    </>
                ) : null
            }
        </div>
    )
}

export default PreAnalysis