import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { authContext } from '../context/authContext';

const UsagesTable = () => {
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

    if (loading) { return <h2>Loading...</h2> }
    if (error) { return <h2>Error...</h2> }

    return (
        <>
            <div className='rounded-md shadow-md bg-white'>
                <h3 className='text-center font-bold text-xl my-3'>Nutzungen</h3>
                <div className='flex clex justify-center gap-3 mb-5'>
                    <table className='table-auto min-w-full rounded-t-xl'> 
                        <thead className='bg-slate-200 border-b-4 rounded-lg text-left'>
                            <tr>
                                <th className='p-3'>Datum</th>
                                <th className='p-3'>Titel</th>
                                <th className='p-3'>Gesellschaft</th>
                                <th className='p-3'>Preis</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                usages.map((usage, i) => {
                                    return (    
                                        <tr key={usage._id} className={`border-b ${(i % 2 !== 0) && 'bg-slate-50' }`}>
                                            <td className='p-3'>{format(parseISO(usage.date), 'yyyy-MM-dd')}</td>
                                            <td className='p-3'>{usage.title}</td>
                                            <td className='p-3 overflow-hidden'>{usage.companyId.substring(0, 12)}</td>
                                            <td className=' p-3 text-right'>{usage.price} €</td>
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