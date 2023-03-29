import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import './analysis-type.scss'

const AnalysisType = () => {
    const location = useLocation()
    return (
        <div className='choice-container'>
            <p className='title'>Выберите этап анализа.</p>
            <p><Link className='link' to="/prepare-analysis" state={{fromPre: true}}>Предварительное исследование</Link></p>
            <p><Link className='link' to="/prepare-analysis" state={{fromMain: true}}>Основное исследование</Link></p>
        </div>
    )
}

export default AnalysisType;