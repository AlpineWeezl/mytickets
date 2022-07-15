import { Add, ArrowBack } from '@mui/icons-material';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authContext } from '../context/authContext'
import PassCard from './PassCard';

const PassesOverview = () => {
    const { token, user, verified } = useContext(authContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [passes, setPasses] = useState(null);

    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        !verified && navigate('/login');
        axios
            .get(`${apiUrl}/passes/user/${user._id}`, {
                headers: {
                    authorization: token
                }
            })
            .then(res => {
                setPasses(res.data.passes);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                toast.error('Das sind nicht deine Pässe!');
                setLoading(false);
                setError(err);
            });

    }, [apiUrl, navigate, token, user._id, verified]);

    const newPassHandler = (e) => {
        navigate('/passes/new')
    }

    if (error) { return <h3>Error...</h3> }
    if (loading) { return <h3>Loading...</h3> }

    return (
        <>
            <div className='flex flex-col justify-center items-center'>
                <div className='fixed flex justify-between items-center top-0 w-full shadow-md bg-white p-4'>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="p-2 w-14 h-14 rounded-full shadow-md border border-red-600 bg-white text-red-600"
                    >
                        <ArrowBack />
                    </button>
                    <h2 className='text-center font-bold text-2xl'>
                        {
                            (user.firstname.substring(user.firstname.length - 1, user.firstname.length) !== 's') ?
                                (`${user.firstname}'s Pässe`)
                                :
                                (`${user.firstname.substring(0, user.firstname.length - 1)}s' Pässe`)
                        }
                    </h2>
                    <button
                        type='button'
                        onClick={newPassHandler}
                        className='p-2 w-14 h-14 rounded-full shadow-md text-white bg-blue-500'
                    >
                        <Add />
                    </button>
                </div>
                <div className='flex flex-col items-center gap-2 pt-24 pb-16 px-2 w-full'>
                    {

                        (passes) && passes.map(pass => {
                            return <PassCard key={pass._id} pass={pass} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default PassesOverview