import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { analysis } from "../../utils/main-analysis";

const MainAnalysis = () => {
    const parameters = useSelector((store) => store.calculationsFile)
    const [canAnalyse, setCanAnalyse] = useState(null)
    const [isDone, setIsDone] = useState(false)

    const startAnalysis = async () => {
        let results = await analysis(parameters)
        console.log(results)
    }

    useEffect(() => {
        if(Object.values(parameters).includes(null) || Object.values(parameters).includes("")) {
            setCanAnalyse(false)
        } else {
            setCanAnalyse(true)
            startAnalysis()
        }
    }, [parameters])

    return(
        <div>
            {
                canAnalyse ? 
                    isDone ?
                    <p>Здесь будут результаты.</p> :
                    <p>Пожалуйста, подождите. Проходит анализ</p> :
                    <p>Ошибка в параметрах.</p>
            }
        </div>
    )
}

export default MainAnalysis;