import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { authContext } from '../context/authContext';

const PassDetails = () => {
    const { passId } = useParams();
    const { token, verified } = useContext(authContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pass, setPass] = useState(null);
    const [timeProgress, setTimeProgress] = useState(0);

    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        !verified && navigate('/login');
        axios
            .get(`${apiUrl}/passes/${passId}`, {
                headers: {
                    authorization: token
                }
            })
            .then(res => {
                setPass(res.data.pass);
                const { begin, end } = res.data.pass;
                console.log(new Date(parseISO(end) - parseISO(begin)))
                // setTimeProgress((Date(end) - new Date()) / (Date(end) - Date(begin)) * 100)
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                toast.error('Die Pass Details konnten nicht geladen werden!')
            });
    }, [apiUrl, navigate, passId, token, verified]);

    if (loading) { return <h2>Loading...</h2> }
    if (error) { return <h2>Error...</h2> }

    return (
        <>
            <div className='w-100 min-h-screen bg-white p-2'>
                <div className='py-3 '>
                    <h2 className='text-center font-bold text-2xl'>{pass.title}</h2>
                </div>
                <hr />
                <div className='py-3'>
                    <h3 className='text-center font-bold text-xl'>Zeitraum</h3>
                    <div className='flex justify-between'>
                        <p>{pass.begin}</p>
                        <p>{pass.end}</p>
                        {format(timeProgress, 'yyyy-MM-dd')}
                    </div>
                </div>
                <hr />
                <div className='py-3'>
                    <h3 className='text-center font-bold text-xl'>Kosten / Nutzen</h3>

                </div>
                <hr />


            </div>
        </>
    )
}

export default PassDetails