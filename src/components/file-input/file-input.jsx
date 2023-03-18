import React, {FC, useRef, useState} from "react";
import { test } from "../../test";

const FileInput = () => {
    const [file, setFile] = useState()

    const testFunc = async () => {
        await test(file)
      }

    const readFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => { 
            const text = (e.target.result)
            console.log(text)
            setFile(text)
        };
        reader.readAsText(e.target.files[0])
    }
    
    return (
        <>
            <input 
                type="file"
                name="file"
                onChange={e => readFile(e)}
            />
            <button onClick={testFunc}>click me</button>
        </>
    )
}
 export default FileInput
