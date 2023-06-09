import React, {FC, useEffect, useState} from "react";
import { useSelector, useDispatch } from "../../utils/types/hooks";
import { analysis } from "../../utils/main-analysis";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './main-analysis.scss'
import { Link } from "react-router-dom";
import { SET_ANALYSIS_PARAMETERS, SET_CALCULATIONS_FILE } from "../../services/actions/calculations-file";
import { SET_FILE } from "../../services/actions/pre-analysis";
import { TMainAnalysisResults } from "../../utils/types/types";

const MainAnalysis: FC = () => {
    const parameters = useSelector((store) => store.calculationsFile)
    const dispatch = useDispatch()
    const [canAnalyse, setCanAnalyse] = useState<boolean | null>(null)
    const [isDone, setIsDone] = useState<boolean>(false)
    const [resultData, setResultData] = useState<null | TMainAnalysisResults[]>(null)

    const startAnalysis = async () => {
        setCanAnalyse(true)
        let results = await analysis(parameters)
        setResultData(results)
        setIsDone(true)
    }

    const clearData = () => {
        dispatch({
            type: SET_CALCULATIONS_FILE,
            results: null
        })
        dispatch({
            type: SET_ANALYSIS_PARAMETERS,
            inputs: {
                left_segment: "",
                right_segment_exp: "",
                right_segment_res: "",
                step: "",
                probability: ""
            },
            started: false
        })
        dispatch({
            type: SET_FILE,
            results: null
        })
    }

    useEffect(() => {
        if(Object.values(parameters).includes("")) {
            setCanAnalyse(false)
        } else {
            setCanAnalyse(true)
        }
    }, [parameters])

    useEffect(() => {
        if(canAnalyse) startAnalysis()
    }, [canAnalyse])

    return(
        <div className="results-container">
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
                    <Link to="/"><button onClick={clearData}>На главную страницу</button></Link>
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
                            <th>Длина входа</th>
                            <th>Трудоемкость в худшем случае</th>
                            <th>Доверительная трудоемкость</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                resultData.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.name}</td>
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