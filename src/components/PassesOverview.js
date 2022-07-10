import { Add } from '@mui/icons-material';
import { Button, Container } from '@mui/material';
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

    if (loading) { return <h3>Loading...</h3> }

    return (
        <>
            <Container sx={{textAlign: 'center'}}>

                <h3>Deine Pässe</h3>
                <Button variant='outlined' onClick={newPassHandler}><Add /></Button>
                {

                    (passes) && passes.map(pass => {
                        return <PassCard key={pass._id} pass={pass} />
                    })
                }
            </Container>
        </>
    )
}

export default PassesOverview