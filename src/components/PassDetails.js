import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react'
import { useContext } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
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
    const [daysLeft, setDaysLeft] = useState(0);

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
                setTimeProgress(Math.round((new Date(end) - new Date()) / (new Date(end) - new Date(begin)) * 10000, 2) / 100);
                setDaysLeft(Math.round((new Date(end) - new Date()) / (3600 * 24 * 1000)));
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
            <div className='fixed top-0 w-full shadow-md bg-white py-5'>
                <h2 className='text-center font-bold text-2xl'>{pass.title}</h2>
            </div>
            <div className='flex flex-col gap-5 my-24 mx-2'>
                <div className='rounded-md shadow-md p-4 bg-white'>
                    <h3 className='text-center font-bold text-xl my-3'>Zeitraum</h3>
                    <div className='flex justify-center gap-3 mb-5'>
                        <p>{format(parseISO(pass.begin), 'yyyy-MM-dd')}</p>
                        <p> - </p>
                        <p>{format(parseISO(pass.end), 'yyyy-MM-dd')}</p>
                    </div>
                    <div className='flex justify-evenly gap-3 text-left'>
                    </div>
                    <div className='flex justify-between gap-5'>
                        <div className='flex flex-col gap-3 items-center font-bold text-lg'>
                            <p>Vergangen</p>
                            <CircularProgressbar value={timeProgress} text={`${timeProgress} %`} />
                        </div>
                        <div className='flex flex-col gap-3 items-center font-bold text-lg'>
                            <p>Übrig</p>
                            <CircularProgressbar value={100 - timeProgress} text={`${daysLeft} T`} />
                        </div>
                    </div>
                </div>

                <div className='rounded-md shadow-md p-4 bg-white'>
                    <h3 className='text-center font-bold text-xl my-3'>Kosten / Nutzen</h3>
                    <div className='flex justify-center gap-3 mb-5'>
                        <p>Kaufpreis:</p>
                        <p>{pass.price} €</p>
                    </div>
                    <div className='flex justify-evenly gap-3 text-left'>
                    </div>
                    <div className='flex justify-between gap-5'>
                        <div className='flex flex-col gap-3 items-center font-bold text-lg'>
                            <p>Genutzt</p>
                            <CircularProgressbar value={timeProgress} text={`${timeProgress} €`} />
                        </div>
                        <div className='flex flex-col gap-3 items-center font-bold text-lg'>
                            <p>Übrig</p>
                            <CircularProgressbar value={100 - timeProgress} text={`${daysLeft} €`} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PassDetails