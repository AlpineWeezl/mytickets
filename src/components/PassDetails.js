import axios from 'axios';
import { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { authContext } from '../context/authContext';
import TimeAnalyzeCard from './TimeAnalyzeCard';
import UsageAnalyzeCard from './UsageAnalyzeCard';
import UsagesTable from './UsagesTable';

const PassDetails = () => {
    const { passId } = useParams();
    const { token, verified } = useContext(authContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pass, setPass] = useState(null);

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
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                toast.error('Die Pass Details konnten nicht geladen werden!')
            });
    }, [apiUrl, navigate, passId, token, verified]);

    if (loading) { return <h2>Loading...</h2> }
    if (error) { return <h2>Error...</h2> }

    const newUsageHandler = () => {
        navigate(`/usages/new/${passId}`);
    }

    return (
        <>
            <button
                type='button'
                onClick={newUsageHandler}
                className='fixed bottom-20 right-6 w-14 h-14 flex justify-center items-center rounded-full shadow-md text-white bg-blue-500 text-6xl'
            >
                +
            </button>
            <div className='fixed top-0 w-full shadow-md bg-white py-5'>
                <h2 className='text-center font-bold text-2xl'>{pass.title}</h2>
            </div>
            <div className='flex flex-col gap-5 my-24 mx-2'>
                <TimeAnalyzeCard pass={pass} />
                <UsageAnalyzeCard pass={pass} />
                <UsagesTable />
            </div>
        </>
    )
}

export default PassDetails