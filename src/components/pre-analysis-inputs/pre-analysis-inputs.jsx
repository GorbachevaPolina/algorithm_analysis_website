import React, {useState} from 'react'
import './pre-analysis-inputs.scss'
import { Link } from 'react-router-dom'
import { SET_PRE_ANALYSIS_PARAMETER } from '../../services/actions/pre-analysis'
import { useDispatch } from 'react-redux'

const PreAnalysisInputs = () => {
    const [input, setInput] = useState("")
    const dispatch = useDispatch()

    const startAnalysis = () => {
        dispatch({
            type: SET_PRE_ANALYSIS_PARAMETER,
            input
        })
    }

    return (
        <div className='pre-analysis-container'>
            <p className='title'>Введите параметры, необходимые для анализа.</p>
            <p>
                <span>Значение длины входа: </span>
                <input 
                    type="text"
                    placeholder="0"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </p>
            <Link to="/pre-analysis">
                <button onClick={startAnalysis}>Провести анализ</button>
            </Link>
        </div>
    )
}

export default PreAnalysisInputs;