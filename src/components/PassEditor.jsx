import { ArrowBackOutlined, Delete, RestartAlt, Save } from '@mui/icons-material';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authContext } from '../context/authContext';
import AssociationDropDown from './AssociationDropDown';
import LoaderPage from './LoaderPage';

const PassEditor = ({ newPass }) => {
    const { user, verified, token } = useContext(authContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pass, setPass] = useState(null);
    const [selectedAssociation, setSelectedAssociation] = useState(null);
    const { passId } = useParams();
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;


    useEffect(() => {
        !verified && navigate('/login');
        if (!newPass) {
            axios
                .get(`${apiUrl}/passes/${passId}`, { headers: { authorization: token } })
                .then(res => {
                    setPass(res.data.pass);
                    setLoading(false);
                })
                .catch(err => {
                    toast.error('Die Karte konnte nicht geladen werden!');
                    console.log(err);
                    setError(err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [apiUrl, navigate, newPass, passId, token, verified]);

    const passHandler = (e) => {
        e.preventDefault();
        const { title, price, begin, end } = e.target;
        if (!selectedAssociation) {
            toast.warning('Wähle bitte einen Verbund aus!');
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
        if (!begin.value) {
            toast.warning('Gib bitte ein Beginn Datum ein!');
            return;
        }
        if (!end.value) {
            toast.warning('Gib bitte ein End Datum ein!');
            return;
        }
        const passToReq = {
            pass: {
                userId: user._id,
                associationId: selectedAssociation._id,
                title: title.value,
                price: price.value,
                begin: new Date(begin.value),
                end: new Date(end.value)
            }
        }

        newPass && axios
            .post(`${apiUrl}/passes/user/${user._id}`, passToReq, { headers: { authorization: token } })
            .then(res => {
                navigate(-1);
                toast.success('Die Karte wurde erfolgreich angelegt!');
            })
            .catch(err => {
                console.log(err);
                toast.error('Die Karte konnte nicht angelegt werden!');
            });

        !newPass && axios
            .put(`${apiUrl}/passes/${pass._id}`, passToReq, { headers: { authorization: token } })
            .then(res => {
                navigate(`/passes/user/${user._id}`);
                toast.success('Die Karte wurde erfolgreich geändert!');
            })
            .catch(err => {
                console.log(err);
                toast.error('Die Karte konnte nicht geändert werden!');
            });
    }

    const deleteHandler = () => {
        axios
            .delete(`${apiUrl}/usages/passes/${pass._id}`, { headers: { authorization: token } })
            .then(res => {
                toast.success('Die zugehörigen Nutzungen wurden erfgolgreich gelöscht.')
            })
            .catch(err => {
                toast.error('Die zugehörigen Nutzungen konnten nicht gelöscht werden!');
            });

        axios
            .delete(`${apiUrl}/passes/${pass._id}`, { headers: { authorization: token } })
            .then(res => {
                navigate(`/passes/user/${user._id}`);
                toast.success('Der Pass wurde erfolgreich gelöscht!')
            })
            .catch(err => {
                toast.error('Der Pass konnte nicht gelöscht werden!');
                console.log(err);
            });
    }

    if (loading || (!newPass && !pass)) { return <LoaderPage /> }
    if (error || (!newPass && !pass)) { return <h3>Error...</h3> }
    
    return (
        <div className='bg-white p-2 shadow-md'>
            <div className='flex justify-between items-center gap-3 font-bold text-2xl my-5'>
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="flex justify-center items-center p-2 w-14 h-14 rounded-full shadow-md border-2 border-red-600 bg-white text-red-600"
                >
                    <ArrowBackOutlined fontSize='large'/>
                </button>
                <h2>{`${!newPass ? pass.title : 'Neue Karte erstellen'}`}</h2>
                {
                    !newPass && <button
                        type="button"
                        onClick={deleteHandler}
                        className='flex justify-center items-center w-12 h-12 rounded-full bg-red-500 text-white shadow'
                    >
                        <Delete fontSize='large' />
                    </button>
                }
            </div>
            <hr className='border-2 border-black' />
            <AssociationDropDown pass={pass} selectedAssociation={selectedAssociation} setSelectedAssociation={setSelectedAssociation} />
            <form onSubmit={passHandler} className='flex flex-col gap-3 py-5'>
                <div className='flex flex-col'>
                    <label htmlFor='title' className='text-xs'>Titel</label>
                    <input
                        id='title'
                        type='text'
                        className='border-b-2 p-2'
                        defaultValue={`${pass ? pass.title : ''}`}
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='price' className='text-xs'>Preis [ € ]</label>
                    <input
                        id='price'
                        type='number'
                        className='border-b-2 p-2'
                        defaultValue={`${pass ? pass.price : ''}`}
                    />
                </div>
                <div className='flex justify-between'>
                    <div className='flex flex-col'>
                        <label htmlFor='begin' className='text-xs'>Beginn</label>
                        <input
                            id='begin'
                            type='date'
                            className='border-b-2 p-2'
                            defaultValue={`${pass ? format(parseISO(pass.begin), 'yyyy-MM-dd') : ''}`}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='begin' className='text-xs'>Ende</label>
                        <input
                            id='end'
                            type='date'
                            className='border-b-2 p-2'
                            defaultValue={`${pass ? format(parseISO(pass.end), 'yyyy-MM-dd') : ''}`}
                        />
                    </div>
                </div>
                <div className="flex justify-around my-3">
                    <button type="reset" className="p-2 w-20 rounded shadow-md bg-red-600 text-white"> <RestartAlt fontSize='large' /></button>
                    <button type="submit" className="p-2 w-20 rounded shadow-md bg-green-700 text-white"><Save fontSize='large'/></button>
                </div>
            </form>
        </div>
    )
}

export default PassEditor