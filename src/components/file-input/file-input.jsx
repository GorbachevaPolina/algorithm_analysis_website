import React, {useState} from "react";
import { useDispatch } from 'react-redux'
import { SET_CALCULATIONS_FILE } from "../../services/actions/calculations-file";
import { SET_FILE } from "../../services/actions/pre-analysis";
import './file-input.scss'
import { Link, useLocation } from "react-router-dom";

const FileInput = () => {
    const [isFileSet, setIsFileSet] = useState(false)
    const dispatch = useDispatch()
    let location = useLocation();

    const readMainFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
            const text = (e.target.result)
            const result_arrays = text.split('\r')
            const results = result_arrays.map(item => item.trim().split(" ")).filter(item => item.length !== 1)
            dispatch({
                type: SET_CALCULATIONS_FILE,
                results
            })
            setIsFileSet(true)
        };
        reader.readAsText(e.target.files[0])
    }

    const readPreFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
            const text = (e.target.result)
            const results = text.split(' ').filter(item => item !== "")
            dispatch({
                type: SET_FILE,
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
                onChange={e => location.state?.fromMain ? readMainFile(e) : readPreFile(e)}
                />
            </div>
            <br/>
            {!isFileSet ? null : <Link to={{pathname: location.state?.fromMain ? "/main-analysis-input-fields" : "/pre-analysis"}}><button>Далее</button></Link>}
        </div>
    )
}
 export default FileInput
