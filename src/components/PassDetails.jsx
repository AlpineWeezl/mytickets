import { ArrowBack, Edit } from '@mui/icons-material';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { authContext } from '../context/authContext';
import LoaderPage from './LoaderPage';
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

    const newUsageHandler = () => {
        navigate(`/usages/new/${passId}`);
    }

    const editPassHandler = (e) => {
        navigate(`/passes/edit/${passId}`);
    }

    if (loading) { return <LoaderPage /> }
    if (error) { return <h2>Error...</h2> }


    return (
        <>
            <div className='fixed flex justify-between items-center top-0 w-full shadow-md bg-white p-4'>
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="p-2 w-14 h-14 rounded-full shadow-md border border-red-600 bg-white text-red-600"
                >.
                    <ArrowBack />
                </button>
                <h2 className='text-center font-bold text-2xl'>{pass.title}</h2>
                <button
                    onClick={editPassHandler}
                    className='flex justify-center items-center w-12 h-12 bg-green-600 text-white rounded-full'
                >
                    <Edit />
                </button>
            </div>
            <div className='flex flex-col gap-5 my-24 mx-2'>
                <TimeAnalyzeCard pass={pass} />
                <UsageAnalyzeCard pass={pass} />
                <UsagesTable newUsageHandler={newUsageHandler} pass={pass} />
            </div>
        </>
    )
}

export default PassDetails