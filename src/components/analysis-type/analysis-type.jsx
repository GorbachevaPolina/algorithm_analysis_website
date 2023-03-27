import React from 'react'
import { Link } from 'react-router-dom';
import './analysis-type.scss'

const AnalysisType = () => {
    return (
        <div className='choice-container'>
            <p className='title'>Выберите этап анализа.</p>
            <p><Link className='link'>Планирование экспериментального исследования</Link></p>
            <p><Link className='link' to="/pre-analysis">Предварительное исследование</Link></p>
            <p><Link className='link' to="/prepare-main-analysis">Основное исследование</Link></p>
        </div>
    )
}

export default AnalysisType;