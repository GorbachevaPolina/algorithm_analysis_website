import React, {FC, useRef, useState} from "react";
import { test } from "../../test";
import { useDispatch } from 'react-redux'
import { SET_CALCULATIONS_FILE } from "../../services/actions/calculations-file";
import InputFields from '../input-fields/input-fields'
import './file-input.scss'

const FileInput = () => {
    const [isFileSet, setIsFileSet] = useState(false)
    const [isBtnPressed, setIsBtnPressed] = useState(false)
    const dispatch = useDispatch()

    // const testFunc = async () => {
    //     await test(file)
    //   }

    const readFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
            const text = (e.target.result)
            const result_arrays = text.split('\r')
            const input_length_values = result_arrays.filter((item, idx) => idx % 2 === 0).map(item => item.trim())
            const results = result_arrays.filter((item, idx) => idx % 2 !== 0).map(item => item.trim().split(" "))
            dispatch({
                type: SET_CALCULATIONS_FILE,
                input_length_values,
                results
            })
            setIsFileSet(true)
        };
        reader.readAsText(e.target.files[0])
    }
    
    return (
        <div className="file-input-container">
            <p className="result-p">Приложите файл с результатами экспериментов:</p>
            <div className="input-container">
                <input 
                type="file"
                name="file"
                onChange={e => readFile(e)}
                />
            </div>
            <br/>
            {isBtnPressed ? null: <button onClick={() => setIsBtnPressed(true)}>Далее</button>}
            {
                isFileSet ? 
                    isBtnPressed ?
                    (<InputFields />) :
                    null :
                    isBtnPressed ?
                    <p className="warning-message">Сначала приложите файл</p> :
                    null
            }
        </div>
    )
}
 export default FileInput
