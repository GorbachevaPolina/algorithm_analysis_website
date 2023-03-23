import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { analysis } from "../../utils/main-analysis";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './main-analysis.scss'

const MainAnalysis = () => {
    const parameters = useSelector((store) => store.calculationsFile)
    const [canAnalyse, setCanAnalyse] = useState(null)
    const [isDone, setIsDone] = useState(false)
    const [resultData, setResultData] = useState(null)

    const startAnalysis = async () => {
        await setCanAnalyse(true)
        let results = await analysis(parameters)
        setResultData(results)
        setIsDone(true)
    }

    useEffect(() => {
        if(Object.values(parameters).includes(null) || Object.values(parameters).includes("")) {
            setCanAnalyse(false)
        } else {
            setCanAnalyse(true)
            // startAnalysis()
        }
    }, [parameters])

    useEffect(() => {
        if(canAnalyse) startAnalysis()
    }, [canAnalyse])

    return(
        <div className="results-container">
            {
                canAnalyse ? 
                    isDone ?
                    null :
                    <p>Пожалуйста, подождите. Проходит анализ</p> :
                    <p>Ошибка в параметрах.</p>
            }
            {
                resultData ?
                (
                    <>
                    <div className="graph-container">
                    <ResponsiveContainer width="45%" height="45%" className="left-graph">
                        <LineChart
                            data={resultData}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" name="альфа" dataKey="alpha" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                    <ResponsiveContainer width="45%" height="45%" className="right-graph">
                        <LineChart
                            data={resultData}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" name="бета" dataKey="beta" stroke="#39b19b" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                    <ResponsiveContainer width="45%" height="45%" className="left-graph">
                        <LineChart
                            data={resultData}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" name="Значение левого квантиля" dataKey="x_gamma" stroke="#d95d52" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                    <ResponsiveContainer width="45%" height="45%" className="right-graph">
                        <LineChart
                            data={resultData}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" name="Доверительная трудоемкость" dataKey="f_gamma" stroke="#d95d52" activeDot={{ r: 8 }} />
                            <Line type="monotone" name="Трудоемкость в худшем случае" dataKey="max_regression" stroke="#39b19b" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th>Трудоемкость в худшем случае</th>
                            <th>Доверительная трудоемкость</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                resultData.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.max_regression}</td>
                                            <td>{item.f_gamma}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    </>
                ) : null
            }
        </div>
    )
}

export default MainAnalysis;