import React, {FC, useState} from 'react'
import { useDispatch } from '../../utils/types/hooks'
import { SET_ANALYSIS_PARAMETERS } from '../../services/actions/calculations-file'
import "./input-fields.scss"
import { Link } from 'react-router-dom'
import { IInputs } from '../../utils/types/types'

const InputFields: FC = () => {
    const dispatch = useDispatch()
    const [inputs, setInputs] = useState<IInputs>({
        left_segment: "",
        right_segment_exp: "",
        right_segment_res: "",
        step: "",
        probability: ""
    }) 

    const startAnalysis = () => {
        dispatch({
            type: SET_ANALYSIS_PARAMETERS,
            inputs,
            started: true
        })
    }

    return(
        <div className='input-fields-container'>
            <p className='title'>Введите параметры, необходимые для анализа.</p>
            <p>
                <span>Левое значение сегмента: </span>
                <input 
                    type="text"
                    placeholder="0"
                    value={inputs.left_segment}
                    onChange={(e) => setInputs({...inputs, left_segment: e.target.value})}
                />
            </p>
            <p>
                <span>Правое значение сегмента в эспериментальном исследовании: </span>
                <input 
                    type="text"
                    placeholder="0"
                    value={inputs.right_segment_exp}
                    onChange={(e) => setInputs({...inputs, right_segment_exp: e.target.value})}
                />
            </p>
            <p>
                <span>Правое значение сегмента для результатов исследования: </span>
                <input 
                    type="text"
                    placeholder="0"
                    value={inputs.right_segment_res}
                    onChange={(e) => setInputs({...inputs, right_segment_res: e.target.value})}
                />
            </p>
            <p>
                <span>Шаг: </span>
                <input 
                    type="text"
                    placeholder="0"
                    value={inputs.step}
                    onChange={(e) => setInputs({...inputs, step: e.target.value})}
                />
            </p>
            <p>
                <span>Значение доверительной вероятности: </span>
                <input 
                    type="text"
                    placeholder="0"
                    value={inputs.probability}
                    onChange={(e) => setInputs({...inputs, probability: e.target.value})}
                />
            </p>
            <Link to="/main-analysis">
            <button onClick={startAnalysis}>Провести анализ</button>
            </Link>
        </div>
    )
}

export default InputFields