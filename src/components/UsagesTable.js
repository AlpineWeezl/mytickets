import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { authContext } from '../context/authContext';
import UsageTableCompanyField from './UsageTableCompanyField';

const UsagesTable = ({ newUsageHandler }) => {
    const { passId } = useParams();
    const { token, verified } = useContext(authContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [usages, setUsages] = useState(null);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        !verified && navigate('/login');
        axios
            .get(`${apiUrl}/usages/pass/${passId}`, {
                headers: {
                    authorization: token
                }
            })
            .then(res => {
                setUsages(res.data.usages);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                toast.error('Die Pass Details konnten nicht geladen werden!')
            });
    }, [apiUrl, navigate, passId, token, verified]);

    const usageDetailHandler = (e) => {
        const { id } = e.target;
        navigate(`/usages/edit/${id}`);
    }

    if (loading) { return <h2>Loading...</h2> }
    if (error) { return <h2>Error...</h2> }

    return (
        <>
            <div className='rounded-md shadow-md bg-white'>
                <div className='flex justify-between p-2 items-center'>
                    <div></div>
                    <h3 className='text-center font-bold text-xl my-3'>Nutzungen</h3>
                    <button
                        type='button'
                        onClick={newUsageHandler}
                        className='w-10 h-10 flex justify-center items-center rounded-full shadow-md text-white bg-blue-500 text-4xl'
                    >
                        +
                    </button>
                </div>
                <div className='flex clex justify-center gap-3'>
                    <table className='table-auto min-w-full rounded-t-xl'>
                        <thead className='bg-slate-200 border-b-4 rounded-lg text-left'>
                            <tr>
                                <th className='p-3'>Datum</th>
                                <th className='p-3'>Gesellschaft</th>
                                <th className='p-3'>Preis</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                usages.map((usage, i) => {
                                    return (
                                        <tr key={usage._id} id={usage._id} onClick={usageDetailHandler} className={`border-b ${(i % 2 !== 0) && 'bg-slate-50'}`}>
                                            <td id={usage._id} name={usage._id} className='p-3'>{format(parseISO(usage.date), 'yyyy-MM-dd')}</td>
                                            <UsageTableCompanyField usage={usage} />
                                            <td id={usage._id} name={usage._id} className=' p-3 text-right'>{usage.price} €</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default UsagesTable