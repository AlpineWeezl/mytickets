import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { authContext } from '../context/authContext';

const PassCard = ({ pass }) => {
    const { dateFormat, token } = useContext(authContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sumUse, setSumUse] = useState(0);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;


    useEffect(() => {
        axios
            .get(`${apiUrl}/usages/pass/${pass._id}`, { headers: { authorization: token } })
            .then(res => {
                const sum = res.data.usages.map(usage => {
                    return usage.price;
                });
                setSumUse(sum.reduce((total, current) => { return total + current; }, 0));
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
                toast.error('Die genutzte Summe konnte nicht berechnet werden!');
            })
    }, [apiUrl, pass._id, token]);

    if (loading) { return <h2>Loading...</h2> }
    if (error) { return <h2>Error...</h2> }

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
                <p className='text-right'>{format(parseISO(pass.begin), dateFormat)}</p>
                <h4 className='text-right'>Ende:</h4>
                <p className='text-right'>{format(parseISO(pass.end), dateFormat)}</p>
                <h4 className='text-right'>Kaufpreis:</h4>
                <p className='text-right'>{pass.price} €</p>
                <h4 className='text-right'>Benutzt:</h4>
                <p className='text-right'>{sumUse} €</p>
            </div>
        </div>
    )
}

export default PassCard