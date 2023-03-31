import React, {FC, useState} from "react";
import { useDispatch } from "../../utils/types/hooks";
import { SET_CALCULATIONS_FILE } from "../../services/actions/calculations-file";
import { SET_FILE } from "../../services/actions/pre-analysis";
import './file-input.scss'
import { Link, useLocation } from "react-router-dom";

const FileInput: FC = () => {
    const [isFileSet, setIsFileSet] = useState<boolean>(false)
    const dispatch = useDispatch()
    let location = useLocation();

    const readMainFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
            const text = e.target?.result
            const result_arrays = (text as string).split('\r')
            const results = result_arrays.map((item: string) => item.trim().split(" ")).filter((item: string[]) => item.length !== 1)
            dispatch({
                type: SET_CALCULATIONS_FILE,
                results
            })
            setIsFileSet(true)
        };
        if(e.target.files)
            reader.readAsText(e.target.files[0])
    }

    const readPreFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
            const text = e.target?.result
            const results = (text as string).split(' ').filter(item => item !== "")
            dispatch({
                type: SET_FILE,
                results
            })
            setIsFileSet(true)
        };
        if(e.target.files)
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
