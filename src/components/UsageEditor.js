import { Delete, RestartAlt, Save } from '@mui/icons-material';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authContext } from '../context/authContext';
import CompanyDropDown from './CompanyDropDown';

const UsageEditor = ({ newUsage }) => {
    const { user, verified, token } = useContext(authContext);
    const { passId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [usage, setUsage] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const { usageId } = useParams();
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;


    useEffect(() => {
        !verified && navigate('/login');
        if (!newUsage) {
            axios
                .get(`${apiUrl}/usages/${usageId}`, { headers: { authorization: token } })
                .then(res => {
                    console.log(res.data.usage);
                    setUsage(res.data.usage);
                    setLoading(false);
                })
                .catch(err => {
                    toast.error('Die Nutzung konnte nicht geladen werden!');
                    console.log(err);
                    setError(err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [apiUrl, navigate, newUsage, token, usageId, verified]);

    const usageHandler = (e) => {
        console.log(selectedCompany);

        e.preventDefault();
        const { title, description, price, date, duration, durationUnit, comment } = e.target;

        if (!selectedCompany) {
            toast.warning('Wähle eine Gesellschaft aus!');
            return;
        }
        if (!title.value) {
            toast.warning('Gib bitte einen Titel ein!');
            return;
        }
        if (!price.value) {
            toast.warning('Gib bitte einen Preis ein!');
            return;
        }
        if (!date.value) {
            toast.warning('Gib bitte ein Datum ein!');
            return;
        }
        if (!duration.value) {
            toast.warning('Gib bitte eine Dauer ein!');
            return;
        }
        if (!durationUnit.value) {
            toast.warning('Gib bitte eine Einheit ein!');
            return;
        }

        const usageToReq = {
            usage: {
                passId: passId,
                userId: user._id,
                companyId: selectedCompany._id,
                associationId: selectedCompany.associationId,
                title: title.value,
                description: description.value,
                price: price.value,
                date: new Date(date.value),
                duration: duration.value,
                durationoUnit: durationUnit.value,
                comment: comment.value
            }
        }

        newUsage && axios
            .post(`${apiUrl}/usages/pass/${passId}`, usageToReq, { headers: { authorization: token } })
            .then(res => {
                navigate(`/usages/edit/${res.data.usage._id}`)
                toast.success('Die Nutzung wurde erfolgreich angelegt!');
            })
            .catch(err => {
                console.log(err);
                toast.error('Die Nutzung konnte nicht angelegt werden!');
            });

        !newUsage && axios
            .put(`${apiUrl}/usages/${usageId._id}`, usageToReq, { headers: { authorization: token } })
            .then(res => {
                console.log(res.data);
                toast.success('Die Nutzung wurde erfolgreich geändert!');
            })
            .catch(err => {
                console.log(err);
                toast.error('Die Nutzung konnte nicht geändert werden!');
            });
    }

    const deleteHandler = () => {

    }

    if (error || (!newUsage && !usage)) { return <h3>Error...</h3> }
    if (loading || (!newUsage && !usage)) { return <h3>Loading...</h3> }

    return (
        <div className="bg-white rounded-md shadow-md mb-14 z-0">
            <div className="flex flex-col justify-center items-center py-3 border-b-2 border-black text-center">
                <h2 className="text-2xl my-3">{newUsage ? 'Neue Nutzung anlegen' : `${usage.title} ändern`}</h2>
                {user.price && (<h3 className="text-xl my-2">({user.username})</h3>)}
                {!newUsage && <button
                    type="button"
                    onClick={deleteHandler}
                    className='flex justify-center items-center w-12 h-12 rounded-full bg-red-500 text-white shadow'>
                    <Delete /></button>}
            </div>
            <div className="w-[85%] mx-auto py-3 my-3">
                <CompanyDropDown selectedCompany={selectedCompany} setSelectedCompany={setSelectedCompany} />
                <form onSubmit={usageHandler} className='flex flex-col gap-5'>
                    <div className="flex flex-col">
                        <label htmlFor="title" className="text-xs">Titel</label>
                        <input
                            id="title"
                            aria-describedby="title-helper-text"
                            type="text"
                            defaultValue={!newUsage ? usage.title : ''}
                            className='border-b-2 p-2' />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="description" className="text-xs">Beschreibung</label>
                        <input
                            id="description"
                            aria-describedby="description-helper-text"
                            type="text"
                            defaultValue={!newUsage ? usage.description : ''}
                            className='border-b-2 p-2'
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="price" className="text-xs">Ticketpreis</label>
                        <input
                            id="price"
                            aria-describedby="price-helper-text border"
                            type="number"
                            defaultValue={!newUsage ? usage.price : ''}
                            className='border-b-2 p-2'
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="date" className="text-xs">Datum</label>
                        <input
                            id="date"
                            aria-describedby="date-helper-text border"
                            type="date"
                            defaultValue={!newUsage ? format(parseISO(usage.date), 'yyyy-MM-dd') : Date.now}
                            className='border-b-2 p-2'
                        />
                    </div>
                    <div className='flex gap-3'>
                        <div className="flex flex-col w-full">
                            <label htmlFor="duration" className="text-xs">Dauer</label>
                            <input
                                id="duration"
                                aria-describedby="duration-helper-text border"
                                type="number"
                                defaultValue={!newUsage ? usage.duration : ''}
                                className='border-b-2 p-2'
                            />
                        </div>
                        <div className="flex flex-col w-8">
                            <label htmlFor='durationUnit' className='text-xs'>Einheit</label>
                            <input
                                id='durationUnit'
                                type={'text'}
                                defaultValue={!newUsage ? usage.durationUnit : 'h'}
                                className='border-b-2 p-2'
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="comment" className="text-xs">Kommentar</label>
                        <input
                            id="comment"
                            aria-describedby="comment-helper-text"
                            type="text"
                            defaultValue={!newUsage ? usage.comment : ''}
                            className='border-b-2 p-2'
                        />
                    </div>
                    <div className="flex justify-around my-3">
                        <button type="reset" className="p-2 w-20 rounded shadow bg-red-600 text-white"> <RestartAlt /></button>
                        <button type="submit" className="p-2 w-20 rounded shadow bg-green-700 text-white"><Save /></button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default UsageEditor
