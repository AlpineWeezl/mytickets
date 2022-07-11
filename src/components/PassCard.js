import React from 'react'
import { useNavigate } from 'react-router-dom'

const PassCard = ({ pass }) => {
    const navigate = useNavigate();

    const clickHandler = () => {
        navigate(`/passes/${pass._id}`);
    }

    return (
        <div onClick={clickHandler} className={'bg-white w-full rounded-md shadow-md'}>
            <div>
                <h3 className='text-center text-lg font-bold'>{pass.title}</h3>
            </div>
            <hr />
            <div className='p-2'>
                <p>{pass.description ? pass.description : 'Keine Beschreibung vorhanden.'}</p>
            </div>
            <hr />
            <div className='grid grid-cols-4 grid-flow-row p-2' >
                <h4 className='text-right'>Beginn:</h4>
                <p className='text-right'>{pass.begin}</p>
                <h4 className='text-right'>Ende:</h4>
                <p className='text-right'>{pass.end}</p>
                <h4 className='text-right'>Kaufpreis:</h4>
                <p className='text-right'>{pass.price} €</p>
                <h4 className='text-right'>Benutzt:</h4>
                <p className='text-right'>{pass.price} € (100%)</p>

                
            </div>
        </div>
    )
}

export default PassCard