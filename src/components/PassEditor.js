import { CreditCard, RestartAlt, Save } from '@mui/icons-material';
import { Button, Card, CardContent, CardHeader, Container, FormControl, Input, InputLabel } from '@mui/material'
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authContext } from '../context/authContext';

const PassEditor = ({ newPass }) => {
    const { user, verified, token } = useContext(authContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pass, setPass] = useState(null);
    const { passId } = useParams();
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;


    useEffect(() => {
        !verified && navigate('/login');
        if (!newPass) {
            axios
                .get(`${apiUrl}/passes/${passId}`, { headers: { authorization: token } })
                .then(res => {
                    console.log(res.data.pass);
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
                title: title.value,
                price: price.value,
                begin: new Date(begin.value),
                end: new Date(end.value)
            }
        }

        newPass && axios
            .post(`${apiUrl}/passes/user/${user._id}`, passToReq, { headers: { authorization: token } })
            .then(res => {
                navigate(`/passes/${res.data.pass._id}/edit`)
                toast.success('Die Karte wurde erfolgreich angelegt!');
            })
            .catch(err => {
                console.log(err);
                toast.error('Die Karte konnte nicht angelegt werden!');
            });

        !newPass && axios
            .put(`${apiUrl}/passes/${pass._id}`, passToReq, { headers: { authorization: token } })
            .then(res => {
                console.log(res.data);
                toast.success('Die Karte wurde erfolgreich geändert!');
            })
            .catch(err => {
                console.log(err);
                toast.error('Die Karte konnte nicht geändert werden!');
            });
    }

    if (error || (!newPass && !pass)) { return <h3>Error...</h3> }
    if (loading || (!newPass && !pass)) { return <h3>Loading...</h3> }

    return (
        <Container sx={{ my: 2 }}>
            <Card>
                <CardHeader title={`${!newPass ? pass.title : 'Neue Karte erstellen'}`} sx={{ textAlign: 'center' }} />
                <CardContent>
                    <form onSubmit={passHandler}>
                        <FormControl sx={{ width: 1, my: 3 }}>
                            <InputLabel htmlFor='title'>Titel</InputLabel>
                            <Input id='title' type='text' defaultValue={`${pass ? pass.title : ''}`} />
                        </FormControl>
                        <FormControl sx={{ width: 1, mb: 3 }}>
                            <InputLabel htmlFor='price'>Preis [ € ]</InputLabel>
                            <Input id='price' type='number' defaultValue={`${pass ? pass.price : ''}`} />
                        </FormControl>
                        <FormControl sx={{ width: 1, mb: 3 }}>
                            <InputLabel htmlFor='begin'>Beginn</InputLabel>
                            <Input id='begin' type='date' defaultValue={`${pass ? format(parseISO(pass.begin), 'yyyy-MM-dd') : ''}`} />
                        </FormControl>
                        <FormControl sx={{ width: 1, mb: 3 }}>
                            <InputLabel htmlFor='end'>Ende</InputLabel>
                            <Input id='end' type='date' defaultValue={`${pass ? format(parseISO(pass.end), 'yyyy-MM-dd') : ''}`} />
                        </FormControl>
                        <Container sx={{ width: 1, display: 'flex', justifyContent: 'space-between' }}>
                            <Button type="reset" variant="contained" color="error"><CreditCard /> <RestartAlt /></Button>
                            <Button type="submit" variant="contained" color="success"><CreditCard /> <Save /></Button>
                        </Container>
                    </form>
                </CardContent>
            </Card>
        </Container >
    )
}

export default PassEditor