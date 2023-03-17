import React, {FC, useRef} from "react";

const FileInput: FC = () => {

    const input = React.createRef<HTMLInputElement>();

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        //@ts-ignore
        console.log(input.current?.files[0])
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="file"
                ref={input}
            />
            <button type="submit">Далее</button>
        </form>
    )
}
 export default FileInput
